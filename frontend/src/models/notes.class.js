export class Notes {
    id=0;
    title='';
    content='';
    lastEdited='';
    archivedStatus=false;
    categories='';

    constructor(id, title, content, lastEdited, archivedStatus, categories){
        this.id = id;
        this.title = title;
        this.content = content;
        this.lastEdited = lastEdited;
        this.archivedStatus = archivedStatus;
        this.categories = categories;
    }
}