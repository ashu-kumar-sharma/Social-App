import React, {Component} from 'react';
import './buzz.css';
import {connect} from "react-redux";
import {deleteBuzz} from "../../utils/actionAlerts";
import {fetchPost, getNotification, removePost, likeButton, dislikeButton} from "../../Actions/post";
import DisplayPost from "./displayPosts";
import CreatePost from "./createPost";
import InfiniteScroll from 'react-infinite-scroller';

class Buzz extends Component {
    constructor(props){
        super(props);
        this.state= {
            filter: 'Most Recent',
            skip: 0
        }
    }
    componentDidMount() {
        this.props.fetchPost(this.state.skip);
        this.props.getNotification();
        this.timerId= setInterval(this.props.getNotification,3000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handleDelete= (id)=>{
        const {removePost}  = this.props;
        deleteBuzz(removePost,id);
    };

    handleChange = (e)=>{
        this.setState({
            filter: e.target.value
        })
    };
    handleLike = (id)=>{
        this.props.likeButton(id);
    };

    handleDislike = (id)=>{
        this.props.dislikeButton(id);
    };
    handleLoading=()=>{
        this.setState({
            skip:this.state.skip + 5
            },()=>{
            this.props.fetchPost(this.state.skip);
        })

    };


    render() {
        const { user } = this.props.user;
        const {post,notification} = this.props.post;
        const {filter,} = this.state;
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className={"posts"}>

                        <CreatePost/>

                        <div className="complainFilter">
                            <h5>Posts</h5>
                            <div className={'filter-block'}>
                                <i className="fas fa-filter"></i>
                                <select onChange={this.handleChange} className={'commonCursor'}>
                                    <option value="Most Recent" defaultValue>Most Recent Buzz</option>
                                    <option value="Activity Buzz">Activity Buzz</option>
                                    <option value="Lost and Found Buzz">Lost and Found Buzz</option>
                                    <option value="My Buzz">My Buzz</option>
                                </select>
                            </div>
                        </div>
                        {
                            (post.length === 0) ? <h3 style={{'textAlign':'center'}}>No Buzz To Show. Create First BUZZ!!</h3> :
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.handleLoading}
                                    hasMore={this.state.skip < post.length}
                                    loader={<div className="loader" key={0}>Loading Posts...</div>}
                                >
                                    {
                                        post.map((item, id) => {
                                            if (filter === 'Most Recent') {
                                                return (
                                                    <DisplayPost
                                                        item={item}
                                                        handleDelete={this.handleDelete}
                                                        key={id}
                                                        email={this.props.user.user.email}
                                                        handleLike={this.handleLike}
                                                        handleDislike={this.handleDislike}
                                                        userID={user._id}
                                                    />
                                                )
                                            } else if ((filter === 'Activity Buzz') && (item.type === 'Activity Buzz')) {
                                                return (
                                                    <DisplayPost
                                                        item={item}
                                                        handleDelete={this.handleDelete}
                                                        key={id}
                                                        email={this.props.user.user.email}
                                                        handleLike={this.handleLike}
                                                        handleDislike={this.handleDislike}
                                                        userID={user._id}
                                                    />
                                                )
                                            } else if ((filter === 'Lost and Found Buzz') && (item.type === 'Lost and Found')) {
                                                return (
                                                    <DisplayPost
                                                        item={item}
                                                        handleDelete={this.handleDelete}
                                                        key={id}
                                                        email={this.props.user.user.email}
                                                        handleLike={this.handleLike}
                                                        handleDislike={this.handleDislike}
                                                        userID={user._id}
                                                    />
                                                )
                                            } else if ((filter === 'My Buzz') && (item.userEmail === this.props.user.user.email)) {
                                                return (
                                                    <DisplayPost
                                                        item={item}
                                                        handleDelete={this.handleDelete}
                                                        key={id}
                                                        email={this.props.user.user.email}
                                                        handleLike={this.handleLike}
                                                        handleDislike={this.handleDislike}
                                                        userID={user._id}
                                                    />
                                                )
                                            }


                                        })
                                    }
                                </InfiniteScroll>
                        }
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="card bg-light mb-3 position-fixed" style={{"maxWidth": "13rem"}}>
                        <div className="card-header">Notification</div>
                        <ul className="card-body">
                            {
                                notification.map((item,id)=>(
                                    <li className={"card-text"} key={id}>{item.username} has posted a buzz.</li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state)=>{
    return{
        user : state.user,
        post: state.post,
        notification: state.post.notification
    }
};
const mapDispatchToProps = {
    fetchPost,
    removePost,
    getNotification,
    likeButton,
    dislikeButton

};

export default connect(mapStateToProps,mapDispatchToProps)(Buzz);