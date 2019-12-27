import React, {Component} from 'react';
import {connect} from "react-redux";
import {savePost} from "../../Actions/post";
import './buzz.css';

class CreatePost extends Component {
    constructor(states){
        super(states);
        this.state={
            body: '',
            image: '',
            type: '',
            error:{
                body: '',
                common: '',
                type: ''
            },
            imageError: '',
            activeLike: '',
            activeDislike: ''

        }
    }

    //function to record change in input fields
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //function to handle change in choose file

    fileSelectHandler=(e)=>{
        this.setState({
            imageError: ''
        });
        const image = e.target.files[0];
        const imageName = image.name;
        const imageExtension = imageName.split('.').pop();
        if(imageExtension === 'jpg' || imageExtension=== 'png' || imageExtension === 'jpeg' || imageExtension ===  'gif'){
            this.setState({
                image: image
            })
        }
        else {
            this.setState({
                imageError: 'Image format must be "PNG", "JPG", "JPEG", or "GIF!"'
            })
        }
    };

    handleClick=(e)=>{
        if(e.target.name === 'Activity Buzz'){
            this.setState({
                type: e.target.value,
                activeLike: 'activeLike',
                activeDislike: ''
            })
        }
        if(e.target.name === 'Lost and Found'){
            this.setState({
                type: e.target.value,
                activeLike: '',
                activeDislike: 'activeDislike'

            })
        }


    };

    //validation function
    validate=(body,image,type)=>{
        let flag = 0;
        if(this.state.imageError){
            flag = 1;
        }
        if(!type){
            flag =1;
            this.setState({
                error: {
                    type: "*Please Select Type Of Buzz!!"
                }
            })
        }
        if(!body.trim().length) {
            flag =1;
            this.setState({
                error: {
                    body: "*Please Enter A Valid Post Body"
                }
            });
        }
        if(!body){
            flag=1;
            this.setState({
                error: {
                    common : "*Please add text!!"
                }
            })
        }
        if(body)
        return flag;
    };

    //function to save the post
    handleSubmit=(event)=>{
        event.preventDefault();
        const {body,image,type} = this.state;
        const err=this.validate(body,image,type);
        if(err===0){
            const formData = new FormData();
            formData.append('body',body);
            formData.append('image',image);
            formData.append('type',type);
            this.props.savePost(formData);
            event.target.reset();
            this.setState({
                    body: '',
                    image: '',
                    type: '',
                    error:{
                        common: '',
                        type: ''
                    },
                    imageError: '',
                    activeLike: '',
                    activeDislike: ''

            })
        }
    };

    clearImage=()=>{
        this.setState({
            image: '',
        });
    };

    render() {
        const {activeLike, activeDislike} = this.state;
        return (
            <form className={'rounded'} onSubmit={this.handleSubmit}>
            <div className={"create-post rounded"}>
                <div className="card">
                    <div className="card-header bg-white">
                        <button
                            type={'button'}
                            name={'Activity Buzz'}
                            className={`btn selector ${activeLike}`}
                            value={'Activity Buzz'}
                            onClick={(e)=>{this.handleClick(e,'value')}}
                        >
                            Activity Buzz
                        </button>
                        <button
                            type={'button'}
                            name={'Lost and Found'}
                            className={`btn selector ${activeDislike}`}
                            value={'Lost and Found'}
                            onClick={(e)=>{this.handleClick(e, 'value')}}
                        >
                            Lost and Found Buzz
                        </button>
                        <span className={'error'}>{this.state.error.type}</span>
                    </div>
                    <div className="card-body">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><img src={this.props.user.user.p_image} className={'profile-image-s'} alt={'userImage'}/></span>
                            </div>
                            <textarea
                                className="form-control text-area"
                                placeholder={"Share your thoughts..."}
                                rows={3}
                                onChange={this.handleChange}
                                name={'body'}
                            ></textarea>
                        </div>
                        <span className={'error'}>{this.state.error.body}</span>
                        <span className={'error'}>{this.state.error.common}</span>
                    </div>
                    <div className="card-footer bg-white">
                        <div className={'input-group d-flex justify-content-between'}>
                            <div className="file fupload btn">
                                <i className="fas fa-file-upload" id={'formbtn'} style={{"color":"white"}}> </i> Choose File
                                <input type="file" name="image" className={'upload commonCursor'} onChange={this.fileSelectHandler}/>
                            </div>
                            <button type="submit" className="btn btn-success float-right" ><i className="fas fa-paper-plane formbtn" id={'formbtn'}> </i> Share</button>
                        </div>
                        {this.state.image?
                            <div className={"mt-4"}>
                                <img
                                    src={URL.createObjectURL(this.state.image)}
                                    alt=""
                                    width="100px"
                                    height="100px"
                                />
                                <button
                                    className="btn btn-outline-warning ml-3"
                                    onClick={this.clearImage}
                                >
                                    Clear File
                                </button>
                            </div>:
                            <div/>}
                        <span className={'error'}>{this.state.imageError}</span>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        user: state.user
    }
};
const mapDispatchToProps={
    savePost
};

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);