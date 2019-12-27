import React,{Component} from 'react';
import moment from 'moment';

export default class DisplayPosts extends Component {
    checkUserLike=(id,like)=>{
        const liked = like.find((item)=>(item === id));
        if(liked){
            return 'liked'
        }
        else{
            return ''
        }
    };
    checkUserDislike=(id,dislike)=>{
        const disliked = dislike.find((item)=>(item === id));
        if(disliked){
            return 'disliked'
        }
        else{
            return ''
        }
    };

    render(){
        const {item, email, handleLike, handleDislike, userID} = this.props;
        const liked = this.checkUserLike(userID,item.like);
        const disliked = this.checkUserDislike(userID,item.dislike);
        return(
            <>
                <div className={"post width-100% rounded"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <div className="post-head">
                                <div className="col-sm-2" style={{"paddingRight":"0px"}}>
                                    <img src={item.userImage} alt="profile" className={'profile-image-s'}/>
                                </div>
                                <div className={"post-title col-sm-10"}>
                                    <div className={'d-flex justify-content-between'}>
                                        <button
                                            type="button"
                                            className="btn"
                                            data-toggle="modal"
                                            data-target={`#myModal${item._id}`}
                                            style={{"padding":"0px"}}
                                        >
                                            <h6 className={"card-author"}>{item.username}</h6>
                                        </button>
                                        <div className="modal fade" id={`myModal${item._id}`}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">User Details</h4>
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className={'user-cover'}>
                                                        </div>
                                                        <div className={"user-img"}>
                                                            <img src={item.userImage} alt={'profile'} className={'u-image'}/>
                                                        </div>
                                                        <div className={'user-data'}>
                                                            <h3 className={'text-center'}>{item.username}</h3>
                                                            <h5>{item.userEmail}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className={'d-flex justify-content-end'}>
                                            <span className={'btn-success rounded lable'}>{item.type}</span>
                                                <div className="dropdown" style={{"minWidth":"50px"}}>
                                                    {
                                                        (item.userEmail === email)?
                                                            <>
                                                                <button
                                                                    className="btn menu-btn"
                                                                    type="button"
                                                                    data-toggle="dropdown">
                                                                <span className="caret">
                                                                    <i className="fas fa-ellipsis-v"> </i>
                                                                </span>
                                                                </button>
                                                                <ul
                                                                    className="dropdown-menu"
                                                                    style={{"backgroundColor":"red","minWidth":"auto"}}
                                                                >
                                                                    <li
                                                                        className="commonCursor"
                                                                        onClick={()=>this.props.handleDelete(item._id)}
                                                                        style={{"color":"white","padding":"5px 15px"}}
                                                                    >
                                                                        <i className="fas fa-trash-alt "> </i>
                                                                    </li>
                                                                </ul>
                                                            </>
                                                        :null
                                                    }
                                                </div>
                                        </div>
                                    </div>
                                    <span className={"card-date"}>
                                        <small className="text-muted">{moment(item.date).fromNow()}</small>
                                    </span>
                                </div>
                            </div>
                            <div className={'card-data col-sm-12'}>
                                <p className={"card-text"}>
                                    {item.body}
                                </p>
                                {
                                    (item.image)?
                                        <img src={item.image} alt="" style={{maxWidth: '100%'}}/>:null
                                }
                                <div className="card-btn">
                                    <button
                                        className={`btn ${liked}`}
                                        onClick={()=>handleLike(item._id)}
                                    >
                                        <i className="far fa-thumbs-up"> </i>
                                    </button>

                                    <span className={"count text-muted"}>
                                        {item.like.length}
                                    </span>

                                    <button
                                        className={`btn ${disliked}`}
                                        onClick={()=>handleDislike(item._id)}
                                    >
                                        <i className="far fa-thumbs-down"> </i>
                                    </button>
                                    <span className={"count text-muted"}>
                                        {item.dislike.length}
                                    </span>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}