import React,{Component} from 'react';
import {Card, CardImg,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb,Button,Modal,ModalHeader,ModalBody,Row,Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }

    handleSubmit=(values)=>{
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span class="fa fa-pencil fa-lg" ></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" class="form-control" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" class="form-control" name="author" id="author" placeholder="Your Name"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" class="form-control" name="comment" id="comment" rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderDish({dish}){
    if(dish!=null){
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>                
                    </Card>
                </FadeTransform>
            </div>
        );
    }
    else{
        return (
            <div></div>
            );
    }
}

function RenderComments({comments,postComment,dishId}){
    if(comments!=null){
        const content=comments.map((comment)=>{
            return(
                <Fade in>
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , 
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US',{
                            year:'numeric',
                            month:'short',
                            day:'2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </li>
                </Fade>
            );
        })
        return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {content}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
        );
    }
    else{
        return <div></div> ;
    }
}


const Dishdetail=(props)=>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        const dish=props.dish;
        const comments=props.comments;
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish} />
                    <RenderComments comments={comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}


export default Dishdetail;