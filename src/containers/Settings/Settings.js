import React from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-blog';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actions from '../../store/actions';
import checkValidity from '../../Util/CheckValidity';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Image from '../../UI/Image/Image';
import Dialog from '../../UI/Dialog/Dialog';

class Settings extends React.Component {

    state={
        first_name: this.props.firstName,
        last_name:this.props.lastName,
        age: this.props.age,
        profileImage:this.props.profileImage,
        about:this.props.about,
        aboutImage: this.props.aboutImage,
        useProfileImage : true,
        axiosError: false,
        error: '',
        removedImages: [],
        validate:{
            first_name: {
                error: '',
                validation:{
                    required: true
                }
            },
            last_name: {
                error: '',
                validation:{
                    required: true
                }
            },
            age: {
                error: '',
                validation:{
                    number: true,
                    min:1,
                    max:100
                }
            },
            profileImage: {
                error: '',
                validation:{
                    required: true
                }
            },
            about: {
                error: '',
                validation:{
                    required: true
                }
            },
            aboutImage: {
                error: '',
                validation:{
                    required: true
                }
            }
        }
    }
    static getDerivedStateFromProps(nextprops, prevprops){
		if(nextprops.email !== prevprops.email ){
			return {
                first_name: prevprops.first_name || '',
                last_name: prevprops.last_name || '',
                age: prevprops.age || 0,
                profileImage: prevprops.profileImage,
                about: prevprops.about || '',
                aboutImage:prevprops.aboutImage,
                useProfileImage:prevprops.aboutImage === prevprops.profileImage
            }
		} else return null;
	}

    componentDidMount(){
        this.props.onLoadSettings(this.props.userId);
    }
    
   firstNameChangeHandler = e => {
       const err = checkValidity("First name",e.target.value, this.state.validate.first_name.validation);
       let v = {...this.state.validate};
       let f_name = {...v.first_name};
        f_name.error = err;
        v.first_name = f_name;
       
       this.setState({
           ...this.state,
           first_name: e.target.value,
           validate: v
       });
   }
   lastNameChangeHandler = e => {
        const err = checkValidity("Last name",e.target.value, this.state.validate.last_name.validation);
        let v = {...this.state.validate};
        let l_name = {...v.last_name};
            l_name.error = err;
            v.last_name = l_name;

        this.setState({
            ...this.state,
            last_name: e.target.value,
            validate: v
        });
    }
    ageChangeHandler = e => {
        const err = checkValidity("Age",e.target.value, this.state.validate.age.validation);
        let v = {...this.state.validate};
        let a = {...v.age};
            a.error = err;
            v.age = a;

        this.setState({
            ...this.state,
            age: e.target.value,
            validate: v
        });
    }
    aboutChangeHandler = e => {
        const err = checkValidity("About",e.target.value, this.state.validate.about.validation);
        this.setState({
            ...this.state,
            about: e.target.value,
            validate: {
                ...this.state.validate,
                about: {
                    ...this.state.validate.about,
                    error: err
                }
            }
        });
    }
    
    sameFileUseHandler = e => {
        const err = checkValidity("Profile image",this.state.profileImage, this.state.validate.profileImage.validation);
        let a = {...this.state.validate.profileImage};
        let b = {...this.state.validate.aboutImage};
            a.error = err;
            b.error = err;

        let profImg = '';
        if(e.target.checked) profImg = this.state.profileImage;
        this.setState({
            ...this.state,
            aboutImage: profImg,
            useProfileImage: e.target.checked,
            validate: {
                ...this.state.validate,
                profileImage:a,
                aboutImage: b
            }
        });
    }
    // submit profile 
    onProfileSubmitHandler = e => {
        e.preventDefault();
        let isOk = true;
        if(this.state.validate.first_name.error !== '' || this.state.first_name === ''){
            isOk = false;
        }
        if(this.state.validate.last_name.error !== '' || this.state.last_name === ''){
            isOk = false;
        }
        if(this.state.validate.profileImage.error !== '' || this.state.profileImage === ''){
            isOk = false;
        }
        if(this.state.validate.age.error !== '' ){
            isOk = false;
        }
        if(!isOk) {
            this.setError("Please make sure the form is completed!");
            return
        }
        this.props.onUserUpdate({
            id: this.props.userId,
            first_name : this.state.first_name.trim(),
            last_name: this.state.last_name.trim(),
            age: this.state.age,
            image: this.state.profileImage.trim(),
            removedImages: [...this.state.removedImages]
        });
    }
    aboutFormSubmitHandler = e => {
        e.preventDefault();
        let isOk = true;
        if(this.state.validate.about.error !== '' || this.state.about === ''){
            isOk = false;
        }
        if(this.state.validate.aboutImage.error !== '' || this.state.aboutImage === ''){
            isOk = false;
        }
        if(!isOk) {
            this.setError("Please make sure the form is completed!");
            return
        }
        this.props.onAboutUpdate({
            id: this.props.aboutId,
            about:this.state.about.trim(),
            image: this.state.aboutImage.trim() 
        })
    }
    fileUploadHandler = (e, cb) => {
		const files = Array.from(e.target.files);
		if(files.length > 1) {
			this.setError("Only one file allowed!");
			return;
		}
		const formData = new FormData()
		files.forEach((file, i) => {
			formData.append(i, file)
		});

		//this.setLoading();
		axios
			.post('api/blog/image/single_upload', formData)
			.then( res => {
				cb(res.data.filename);
			 })
			.catch( err => this.setError(err))
    }
    updateProfileFileName = name => {
        const proImg = name;
        let abtImg = this.state.aboutImage
        if(this.state.useProfileImage){
            abtImg = name;
        }
        this.setState({
            ...this.state,
            aboutImage: abtImg,
            profileImage: proImg,
            validate: {
                ...this.state.validate,
                profileImage:{
                    ...this.state.validate.profileImage,
                    error:''
                },
                aboutImage: {
                    ...this.state.validate.aboutImage,
                    error:''
                }
            }
        });
    }

    updateAboutFileName = name => this.setState(
        {
            ...this.state,
            aboutImage: name,
            validate: {
                ...this.state.validate,
                aboutImage: {
                    ...this.state.validate.aboutImage,
                    error:''
                }
            }
        });

    setError = err => {
        this.setState(
        {...this.state,error: err})
    };
    
    deleteProfileImageHandler = name => {
        let abImg = this.state.aboutImage;
        if(this.state.useProfileImage) abImg = '';
        this.setState({
            ...this.state,
            removedImages: [...this.state.removedImages,name],
            profileImage: '',
            aboutImage: abImg,
            validate: {
                ...this.state.validate,
                profileImage:{
                    ...this.state.validate.profileImage,
                    error:'Profile image required!'
                },
                aboutImage: {
                    ...this.state.validate.aboutImage,
                    error: abImg==='' ? 'About image required!': ''
                }
            }
        });
    }
    deleteAboutImageHandler = name => this.setState(
            {   ...this.state,
                removedImages: [...this.state.removedImages,name],
                aboutImage: '',
                useProfileImage: false,
                validate: {
                    ...this.state.validate,
                    aboutImage: {
                        ...this.state.validate.aboutImage,
                        error: 'About image required!'
                    }
                }
            }
        );
    handleAxiosError = e => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            axiosError: true
        })
        this.props.signIn()
    }
    handleErrorDialog = e => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            error: ''
        })
    }

    render(){
        let errorDialog = null;
        if(this.props.axiosError === 'logout' && !this.state.axiosError){
            errorDialog = <Dialog click={ e => this.handleAxiosError(e)} err="Your session expired!<B> Please log in." />
        }else if(this.state.error !== ''){
            errorDialog = <Dialog click={e => this.handleErrorDialog(e)} err = {this.state.error} />
        }

        let profilePicture = (<Input 
            type='file' 
            placeholder="upload file here"
            error={this.state.validate.profileImage.error}
            onChange={e => this.fileUploadHandler(e, this.updateProfileFileName)} />);
        if(this.state.profileImage !== ''){
            profilePicture = (<div>
                    <Image 
                        name={this.state.profileImage} />
                    <Button 
                        type="button"
                        styleClass='simpleButton'
                        clicked={() => this.deleteProfileImageHandler(this.state.profileImage)}>
                        Change image
                    </Button>
                </div>)
        }
        let abtImage = null;
        if(this.state.aboutImage !== ''){
            abtImage = (<div>
                <Image 
                    name={this.state.aboutImage} />
                <Button 
                    type="button"
                    styleClass='simpleButton'
                    clicked={() => this.deleteAboutImageHandler(this.state.profileImage)}>
                    Change image
                </Button>
            </div>)
        } else{
            abtImage = (<Input 
                type='file'
                error={this.state.validate.aboutImage.error}
                placeholder="upload file here"
                onChange={e => this.fileUploadHandler(e, this.updateAboutFileName)} />);
        }
        return(
            <div className="Setting">
                {errorDialog}
                <section>
                    <h2>Profile Settings</h2>
                    <form onSubmit={this.onProfileSubmitHandler}>
                        <Input 
                            type='text' 
                            placeholder="first name"
                            value={this.state.first_name || ''}
                            error={this.state.validate.first_name.error}
                            onChange={this.firstNameChangeHandler} />
                        <Input 
                            type='text' 
                            placeholder="last name"
                            value={this.state.last_name || ''}
                            error={this.state.validate.last_name.error}
                            onChange={this.lastNameChangeHandler} />
                        <Input 
                            type='number' 
                            value={this.state.age}
                            error={this.state.validate.age.error}
                            onChange={this.ageChangeHandler} />
                        {profilePicture}
                        <Button 
                            type="submit" 
                            styleClass="center">
                            Submit
                        </Button>
                    </form>
                </section>
                <section>
                    <h2>About me</h2>
                    <form onSubmit={this.aboutFormSubmitHandler}>
                        <Input
                            label='Use profile image?'
                            labelshow="show"
                            type="checkbox" 
                            checked={this.state.useProfileImage} 
                            onChange={this.sameFileUseHandler} />
                        {abtImage}
                        <Input 
                            type='textarea' 
                            value={this.state.about || ''}
                            error={this.state.validate.about.error}
                            placeholder="talk about yourself here"
                            onChange={this.aboutChangeHandler} />
                        <Button 
                            type="submit" 
                            styleClass="center">
                            Submit
                        </Button>
                    </form>
                </section>
                <section className="formField">
                    <p>Change Password?</p>
                    <Button 
                        styleClass='simpleButton' 
                        clicked={this.props.changePasswordClickHandler}
                        type="button">
                        Click here
                    </Button>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstName : state.settingReducer.first_name,
        lastName:state.settingReducer.last_name,
        age: state.settingReducer.age,
        email:state.settingReducer.email,
        profileImage:state.settingReducer.profileImage,
        about:state.settingReducer.about,
        aboutImage: state.settingReducer.aboutImage,
        userId: state.authReducer.user,
        aboutId: state.settingReducer.aboutId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadSettings : id => dispatch(actions.getSettings(id)),
        onAboutUpdate : data => dispatch(actions.updateAbout(data)),
        onUserUpdate: data => dispatch(actions.updateUser(data)),
        changePasswordClickHandler: _ => dispatch(actions.changePasswordClick()),
        signIn : _ => dispatch(actions.showSignInClick())
    }
}
export default connect(
	mapStateToProps, 
    mapDispatchToProps)(withErrorHandler(Settings, axios) );
