const db = require('../config/db');

//crear actividad
const createActivity = async (name_activity, description,creator_id,cost_points) => {
    try {
        const [result] = await db.query(
            'INSERT INTO activity (name_activity, description,creator_id,cost_points) VALUES (?,?, ?, ?)',
            [name_activity, description, creator_id, cost_points]
        );
        return {id: result.insertId, name_activity, description,creator_id, cost_points};
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//obtener actividades por paginacion, limit es cuantas actividades por pagina y page que pagina quiere
const findAll = async (limit, offset) => {
  try {
    const [rows] = await db.query(
      `SELECT a.*, u.name as creator_name 
       FROM activity a
       JOIN users u ON a.creator_id = u.id
       ORDER BY a.create_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//eliminar actividad
const remove = async (id) => {
    try{
        await db.query('DELETE FROM members_activity WHERE id_activity = ?', [id]);
        const [result] = await db.query('DELETE FROM activity WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error(error)
    }
}

//unirse a actividad 
const joinActivity = async (user_id, activity_id) => {
    try{
        const [result] = await db.query(
            'INSERT INTO members_activity (id_users, id_activity) VALUES (?, ?)',
            [user_id, activity_id]
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}

//obtener actividad por nombre
const findByName = async (name_activity) => {
    try{
        const [rows] = await db.query('SELECT * FROM activity WHERE name_activity LIKE ?',[`%${name_activity}%`]);
        return rows[0];
    } catch (error) {
        console.error(error)
    }
}

//para ver si el usuario ya esta registrado
const isUserJoined = async(user_id, activity_id) => {
    
    try {
        const [rows] = await db.query('SELECT * FROM members_activity WHERE id_users = ? AND id_activity = ?', [user_id, activity_id]);
        return rows[0];
    } catch (error) {
        console.error(error)
    }

    }
    

module.exports = {createActivity,findAll,remove,joinActivity,findByName,isUserJoined}