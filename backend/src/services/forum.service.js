const threadModel = require("../models/thread.models");
const commentsModel = require("../models/comment.model");

//crear hilo
const createThread = async (category, title, body, author_id, media) => {
    const newThread = await threadModel.createThread(category, title, body, author_id, media);
    return newThread;
}

//crear comentario
const createComment = async (authorId,threadId, body, parentId = null, media) => {
    const newComment = await commentsModel.createComment(authorId,threadId, body, parentId, media);
    return newComment;
}

//eliminar hilo
const deleteThread = async (id, userId) => {
    const thread = await threadModel.findById(id);
    if (thread.author_id !== userId) throw new Error('No tienes permiso para eliminar este hilo');
    return await threadModel.deleteThread(id);
}

//eliminar comentario
const deleteComment = async (id) => {
    const removedComment = await commentsModel.deleteComment(id);
    return removedComment;
}

//buscar hilo por categoria
const getThreadsByCategory = async (category, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const threads = await threadModel.findByCategory(category, limit, offset);

  const threadsWithComment = await Promise.all(
    threads.map(async (thread) => {
      const lastComment = await commentsModel.findLastByThread(thread.id);
      return { ...thread, last_comment: lastComment || null };
    })
  );

  return threadsWithComment;
};

//obtener hilos
const getThreads = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const threads = await threadModel.findAllThreads(limit, offset);
  
  const threadsWithComment = await Promise.all( //creamos una promesa donde pido que a cada hilo se le agregue un comentario
    threads.map(async (thread) => { //.map lo que hace es modificar el array de hilos, modificando cada hilo para agregarle el comentario
      const lastComment = await commentsModel.findLastByThread(thread.id);
      return { ...thread, last_comment: lastComment || null }; //retorna el nuevo 
    })
  );

  return threadsWithComment;//retorna el hilo + comentario 
};

//encontrar hilos por nombre
const searchThreads = async (title, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const threads = await threadModel.findByTitle(title, limit, offset);

  const threadsWithComment = await Promise.all(
    threads.map(async (thread) => {
      const lastComment = await commentsModel.findLastByThread(thread.id);
      return { ...thread, last_comment: lastComment || null };
    })
  );

  return threadsWithComment;
};
//encontrar el ultimo comentario
const findLastByThread = async(thread_id) => {
    const lastComment = await commentsModel.findLastByThread(thread_id);
    return lastComment;
}

//obtener hilo por el id cuando el usuario quiera entrar a uno
const getThreadById = async (id) => {
  const thread = await threadModel.findById(id);
  if (!thread) throw new Error('Hilo no encontrado');

  const comments = await commentsModel.findAllByThread(id);

  // Construir árbol de comentarios
  const commentMap = {};//objeto
  const roots = [];//array

  comments.forEach(comment => { //recorre el objeto de comments para meter en el nuevo objeto commentMap las id y agregar replies al objeto commentMap
    commentMap[comment.id] = { ...comment, replies: [] };
  });

  comments.forEach(comment => {//recorre otra vez comentarios pero teniendo en cuenta replies
    if (comment.parent_id) {//si el comentario tiene una respuesta lo agrega a commentMap
      commentMap[comment.parent_id].replies.push(commentMap[comment.id]);
    } else {//si no tiene respuestas lo deja en root, que son las respuestas o comentarios principal del hilo
      roots.push(commentMap[comment.id]);
    }
  });

  return { ...thread, comments: roots };
};

module.exports = { createThread, createComment, deleteThread, deleteComment, getThreadsByCategory, getThreads, searchThreads, findLastByThread, getThreadById };
