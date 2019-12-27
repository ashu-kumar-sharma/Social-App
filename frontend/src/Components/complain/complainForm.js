import React,{Component} from 'react';
import {connect} from "react-redux";
import {fileComplain} from "../../Actions/complain";
class ComplainForm extends Component{
    constructor(props){
        super(props);
        this.state={
            department: "",
            title: "",
            concern: "",
            image: '',
            error:{
                concern: '',
                department: '',
                title: '',
            }
        }
    }

    //validation function
    validate=(concern,title,department)=>{
        let flag = 0;
        if(!title.trim().length) {
            flag =1;
            this.setState({
                error: {
                    title: "*Please Enter A Valid Complain Title"
                }
            });
        }
        if(!concern.trim().length) {
            flag =1;
            this.setState({
                error: {
                    concern: "*Please Enter A Valid Complain Body"
                }
            });
        }
        if(!department){
            flag =1;
            this.setState({
                error: {
                    department: "*Please Select Department of Complain!!"
                }
            })

        }
        if(!concern){
            flag=1;
            this.setState({
                error: {
                    concern : "*Please Add Concern For The Complain!!"
                }
            })
        }
        if(!title){
            flag=1;
            this.setState({
                error: {
                    title : "*Please Add Title For The Complain!!"
                }
            })
        }
        return flag;
    };

    handleSubmit = (e)=>{
        e.preventDefault();
        const { title, department, concern, image} = this.state;
        const err = this.validate(concern,title,department);
        if(err===0){

            let formData = new FormData();
            formData.append('title', title);
            formData.append('department', department);
            formData.append('concern', concern);
            formData.append('image',image);

            this.props.fileComplain(formData);
            e.target.reset();
            this.setState({
                department: "",
                title: "",
                concern: "",
                image: '',
                error:{
                    concern: '',
                    department: '',
                    title: '',
                }
            })
        }

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };
    fileChange = (event) =>{
        const image = event.target.files[0];
        this.setState({
            image
        });


    };
    render(){
        return (
            <>
                <form className={'form rounded'} onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Select Department</label>
                            <select id="inputState" name={'department'} className="form-control" onChange={this.handleChange}>
                                <option  defaultValue >Choose...</option>
                                <option>Hardware</option>
                                <option>Infrastructure</option>
                                <option>Others</option>
                            </select>
                            <span className={'error'}>{this.state.error.department}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Issue Title</label>
                            <input type="text" className="form-control" name={'title'} placeholder="Issue Title" onChange={this.handleChange} />
                            <label className={'error'}>{this.state.error.title}</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Your Concern</label>
                        <textarea className="form-control" placeholder="Your Concern" name={'concern'} rows={3} onChange={this.handleChange} />
                        <label className={'error'}>{this.state.error.concern}</label>
                    </div>
                    <div className="custom-file mb-3">
                        <input type="file" className="custom-file-input" name="image" id="image"  onChange={this.fileChange}/>
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                    <button type="submit" className="btn btn-light border-dark">Submit</button>
                </form>
            </>
        );
    }
}

const mapDispatchToProps = {
    fileComplain
};
export default connect(null, mapDispatchToProps)(ComplainForm);