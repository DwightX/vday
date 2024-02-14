import React, { Component } from 'react';
import './SMSForm.css';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '8134055149',
        body: 'Thank you for still being my valentine on valentines day :) I Love you sweatheart 😘',
        willBeMyValentine: ''
      },
      submitting: false,
      error: false,
      showBodyInput: false,
      messageSent: false // Flag to track if message is sent
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickYes = this.handleClickYes.bind(this);
    this.handleClickNo = this.handleClickNo.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            },
            messageSent: true // Set messageSent flag to true
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }

  handleClickYes() {
    this.setState({ submitting: true }, () => {
      // Display an alert message when 'Yes' is clicked
      alert("Check your text");
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.message)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({
              error: false,
              submitting: false,
              message: {
                to: '',
                body: ''
              },
              messageSent: true // Set messageSent flag to true
            });
          } else {
            this.setState({
              error: true,
              submitting: false
            });
          }
        });
    });
  }

  handleClickNo() {
    if (this.state.showBodyInput) {
      this.setState({ showBodyInput: false });
    } else {
      alert("Sorry to hear that!");
    }
  }

  onHandleChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox' && checked) {
      console.log(name); // Log out the name of the checkbox
    }
    this.setState(prevState => ({
      message: {
        ...prevState.message,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <div>
          <label htmlFor="to"></label>
        </div>
        <div className='container'>
          <div className='circle'>
          <h2>Will You Be My Valentine?</h2>
          <button type="button" onClick={this.handleClickYes}>
            Yes
          </button>
          <button type="button" onClick={this.handleClickNo}>
            No
          </button>
          </div>
        </div>
        {this.state.showBodyInput && (
          <div>
            <label htmlFor="body">Body:</label>
            <textarea
              name="body"
              id="body"
              value={this.state.message.body}
              onChange={this.onHandleChange}
            />
          </div>
        )}
        {/* {!this.state.messageSent && ( // Render submit button only if message is not sent
          <button type="submit" disabled={this.state.submitting}>
            Send message
          </button>
        )} */}
      </form>
    );
  }
}

export default SMSForm;
