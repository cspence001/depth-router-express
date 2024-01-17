import React from "react";
import ItemList from "./ItemList";
class ItemComponent extends React.Component {
    state = {
      items: []
    };
  
    addItem= () => {
      const newItem = Number(new Date()); 
      this.state.items.push(newItem);
      this.setState({
        items: this.state.items
      });
    };
  
    render() {
      return (
        <div>
          <button onClick={this.addItem}>
            Add item
          </button>
          <ItemList items={this.state.items} />
        </div>
      );
    }
  }
export default ItemComponent;
  