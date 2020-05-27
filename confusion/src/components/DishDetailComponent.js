import React from 'react';
import { Card ,CardTitle,CardImg,CardText,CardBody,Breadcrumb,BreadcrumbItem }  from 'reactstrap';
import { Link} from 'react-router-dom';



function RenderDish({dish})
{
   
    if(dish!=null)
    {
    return(
       
        <div className="col-12 col-md-8 m-1">
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>                
        </Card>
    </div>
    
    );
    }
    else{
        return(
            <div></div>
        );
    }
}
  function RenderComment({comments})
{
    if(comments!=null){
        const content=comments.map((data) => { 
            return(
               
                <li key={data.id}>
                <p>{data.comment}</p>
                <p  >-- {data.author} , 
                &nbsp;
                {new Intl.DateTimeFormat('en-US', 
                { year: 'numeric',
                 month: 'short',
                  day: '2-digit'}).format(new Date(Date.parse(data.date)))}
                </p>
            </li>
          
                );
        })
        return(
            
                            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {content}
                </ul>
            </div>
            
            
        );
       
    }
    else{
        return(
            <div></div>
        );
    }
}
const DishDetail= (props) =>{
    
    // console.log(this.props.dish);
        if(props.dish!=null){
            return(
                
                    <div className="container">
                    <div className="row">
                        <Breadcrumb>
    
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComment comments={props.comments} />
                        </div>
                    </div>
                    </div>
                
            );
           
            }
            else{
                return(
                    <div></div>
                );
            }              }


export default DishDetail;