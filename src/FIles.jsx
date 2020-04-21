import React, { Component } from 'react'

export default class FIles extends Component {
    state={
        file:''
    }

    handleFileChange=(e)=>{
        // console.log(e.target.files[0])
        this.setState({file:e.target.files[0]},()=>{
            let formData = new FormData()
            formData.append(
                'courseFile',
                this.state.file,
                this.state.file.name
            )
            console.log(formData)
        })
    }

    render() {
        return (
            <div>
                <input type='file' onChange={this.handleFileChange} />
            </div>
        )
    }
}
