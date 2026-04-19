

export class BasePost  {
    author!: string;
    date: Date = new Date();;
    
    setAuthor(name : string)
    {
        this.author = name;
    }

    formatDate()
    {
        return this.date.toLocaleDateString();
    }
}