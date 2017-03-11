import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import book_stock_small from '../images/book_stock_small.jpeg'

const BookCard = React.createClass({

  render() {
    const { book } = this.props

    return (
      <Card className="col-xs-2">
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="images/jsa-128.jpg"
        />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={book_stock_small} />
        </CardMedia>
        <CardTitle title={book.title} subtitle={book.authors[0].name} />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Save" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )
  }
})

export default BookCard;
