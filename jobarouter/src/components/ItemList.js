import React from "react";
class ItemList extends React.Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => <li key={item}>{item}</li>)}
        </ul>
      );
    }
  }
export default ItemList;