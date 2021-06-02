import React from 'react';
import ContentEditable from "react-contenteditable";
import './App.css';

class TitleEditbox extends React.Component{
  constructor() {
    super();
    this.state = {html: null};
  }

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  }

  render() {
    return (
      <ContentEditable 
        className="item_title"
        placeholder="enter your title..."
        html={this.state.html}
        disabled={false}
        onChange={this.handleChange} />
    )
  }
}

class DescEditbox extends React.Component{
  constructor() {
    super();
    this.state = {html: null};
  }

  handlechange = evt => {
    this.setState({html: evt.target.value});
  }

  render = () =>{
    return (
      <ContentEditable 
        className="item_desc"
        placeholder="enter description..."
        html = {this.state.html}
        disabled = {false}
        onChange={this.handlechange} />
      );
  }
}

class PriorityEditbox extends React.Component{
  constructor() {
    super();
    this.state = {html: null};
  }

  handleinput = evt => {
    this.setState({html: evt.target.value});
  }

  render = () =>{
    return (
      <ContentEditable 
        className="item_p"
        placeholder="priority"
        html = {this.state.html}
        disabled = {false}
        onChange={this.handleinput} />
      );
  }
}

class DueEditbox extends React.Component{
  constructor() {
    super();
    this.state = {html: null};
  }

  handledue = evt => {
    this.setState({html: evt.target.value});
  }

  render = () =>{
    return (
      <ContentEditable 
        className="item_due"
        placeholder="dd-mm-yyyy"
        html = {this.state.html}
        disabled = {false}
        onChange={this.handledue} />
      );
  }
}

class category{
  constructor(cat_title, cat_ID, item_list=[]){
    this.categoryTitle = cat_title;
    this.categoryID = cat_ID;
    this.item_List = item_list;
  }
}

class item{
  constructor(itemList_ID, item_num){
    this.itemListID = itemList_ID;
    this.total_item = item_num; //track how many items in the item list
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {category_list: [], categoryListID: 0, categoryTitle: ""}
    this.add_category = this.add_category.bind(this);
    this.ContentEditable = React.createRef();
  }

  add_category(){
    let cat_title = this.state.categoryTitle;
    let catid = this.state.categoryListID;
    let category_item = new category(cat_title, catid, []);
    this.setState({
      categoryListID: this.state.categoryListID + 1,
      category_list: [...this.state.category_list, category_item],
      categoryTitle: ""
    })
  }

  add_item(cid){
    let the_cat = this.state.category_list
    let modified_itemlist = this.state.category_list.find(({categoryTitle, categoryID, item_List}) => categoryID === cid);
    let cat_index = this.state.category_list.find(({categoryTitle, categoryID, item_List}) => categoryID === cid);
    let items = modified_itemlist.item_List;
    let item_id = items.length + 1;
    let new_item = new item(cid, item_id);
    items = [...items, new_item];
    modified_itemlist.item_List = items;
    the_cat[cat_index] = modified_itemlist;
    this.setState({
      category_list: the_cat
    })
    

  }

  delete_item(delid, cid){
      let cat = this.state.category_list;
      let cat_index = this.state.category_list.findIndex(({categoryTitle, categoryID, item_List}) => categoryID === cid);
      let deleted_itemlist = this.state.category_list.find(({categoryTitle, categoryID, item_List}) => categoryID === cid);
      let deleted_item = deleted_itemlist.item_List.filter(({itemListID,itemDesc, itemPriority, itemDue, total_item}) => delid !== total_item);
      deleted_itemlist.item_List = deleted_item;
      cat[cat_index] = deleted_itemlist;
      this.setState({
        category_list: cat
      })
  }

  render(){
    return(
      <div>
        <div className="header">TRACK YOUR LIFE</div>
        <div className="container">
          <input type="text" 
            placeholder = "add your category here..."
            onChange={(event) => this.setState({categoryTitle: event.target.value})}
            value={this.state.categoryTitle}/>
            <div className="add_btn" onClick={this.add_category}>Create</div>

            <div className="content">

            {this.state.category_list.map(Newcat =>
              <div key={Newcat.categoryID} className = "category">
                <div className="cat_title">Category: {Newcat.categoryTitle}</div> 
                <div onClick={this.add_item.bind(this, Newcat.categoryID)} className="item_btn">CreateItem</div>
                <div className="item">
                  <div className="item_title">Title</div>
                  <div className="item_desc">Description</div>
                  <div className="item_p">Priority</div>
                  <div className="item_due">DueDate</div>
                </div>
                {Newcat.item_List.map(Newitem =>
                    <div key={Newitem.total_item} className="item">
                      <TitleEditbox/>
                      <DescEditbox />
                      <PriorityEditbox />
                      <DueEditbox />
                      
                      <div onClick={this.delete_item.bind(this, Newitem.total_item, Newcat.categoryID)} className="delete_btn">Delete</div>
                    </div>
                    )}
              </div>
            )}
            </div>
          </div>  
        </div>
      )
  }
}


export default App;
