import view from './editor.html!';

export class Editor {
  constructor(){
    this.title = 'Example';
    this.text = '';
    this.previewArea = '';
    this.id = '';
  }
  
  page() {
    return false; 
  }
  
  getViewStrategy() {
    return view;
  }
}