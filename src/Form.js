import React, { Component } from "react";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import GooglePlaceAutocomplete from "material-ui-places";
import GeoAutocomplete from "./GeoComplete.js";
import Checkbox from "material-ui/Checkbox";

class Form extends Component {
  state = {
    title: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: "",
    event1: "",
    event2: "",
    description: "",
    category1: [
      "Meetup",
      "Workshop",
      "Training",
      "Festival",
      "Seminar",
      "Competition",
      "Exhibition",
      "Party"
    ],
    file: null,
    imagePreviewUrl: null
  };

  handleClick = () => {
    console.log(this.state);
  };

  handleChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleTitleChange = addr => {
    this.setState({
      title: addr.formatted_address
    });
  };

  handleStartDateChange = (_, startDate) => {
    this.setState({
      startDate
    });
  };

  handleEndDateChange = (_, endDate) => {
    this.setState({
      endDate
    });
  };

  handleCheck = (event, isInputChecked) => {
    this.setState({
      disabled: isInputChecked,
      endDate: isInputChecked ? this.state.startDate : this.state.endDate
    });
  };
  handleStartTimeChange = (_, startTime) => {
    this.setState({
      startTime,
      endTime: startTime
    });
  };

  handleEndTimeChange = (_, endTime) => {
    this.setState({
      endTime
    });
  };

  handleLocationChange = (_, location) => {
    this.setState({
      location
    });
  };
  onAutoCompleteEverywhereInputChangeFct = e => {
    this.setState({
      location: e.target.value
    });
  };

  formatDate = date => {
    return date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();
  };

  onClickEverywhereLocationFct = (
    selectedData,
    searchedText,
    selectedDataIndex
  ) => {
    this.setState({
      location: selectedData.description
    });
  };
  render() {
    return (
      <div>
        <div className="header">
          <h1>
            Add your event
            <small>Follow the steps below</small>
          </h1>
        </div>
        <form action="">
          <div className="row">
            <TextField
              floatingLabelText="Title"
              underlineShow={false}
              onChange={this.handleTitleChange}
              style={{ padding: 5 }}
              fullWidth
            />
          </div>
          <div className="row">
            <DatePicker
              autoOk
              className="col1"
              floatingLabelText="Start Date"
              locale="en-US"
              fullWidth
              disabled={this.state.disabled}
              underlineShow={false}
              formatDate={this.formatDate}
              minDate={new Date()}
              onChange={this.handleStartDateChange}
              textFieldStyle={{ padding: 5 }}
              style={{ flex: 1 }}
            />
            <div style={{ flex: 1 / 10 }} />
            <DatePicker
              className="col1"
              floatingLabelText="End Date"
              autoOk
              formatDate={this.formatDate}
              disabled={this.state.disabled}
              fullWidth
              value={this.state.endDate}
              underlineShow={false}
              minDate={this.state.startDate || new Date()}
              textFieldStyle={{ padding: 5 }}
              onChange={this.handleEndDateChange}
              style={{ flex: 1 }}
            />
          </div>
          <div className="row">
            <Checkbox
              label="Same day"
              style={{ textColor: "white" }}
              onCheck={this.handleCheck}
            />
          </div>
          <div className="row">
            <TimePicker
              floatingLabelText="Start"
              format="24hr"
              autoOk
              fullWidth
              underlineShow={false}
              onChange={this.handleStartTimeChange}
              textFieldStyle={{ padding: 5 }}
              style={{ flex: 1 }}
            />
            <div style={{ flex: 1 / 10 }} />
            <TimePicker
              floatingLabelText="End"
              format="24hr"
              value={this.state.endTime}
              autoOk
              fullWidth
              underlineShow={false}
              onChange={this.handleEndTimeChange}
              textFieldStyle={{ padding: 5 }}
              style={{ flex: 1 }}
            />
          </div>
          <div className="row">
            <GeoAutocomplete
              floatingLabelText="Location"
              fullWidth
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="row">
            <AutoComplete
              floatingLabelText="Event Category 1"
              filter={AutoComplete.noFilter}
              openOnFocus={true}
              dataSource={this.state.category1}
              fullWidth
              textFieldStyle={{ padding: 5 }}
              underlineShow={false}
            />
          </div>
          <div className="row">
            <AutoComplete
              floatingLabelText="Event Category 2"
              openOnFocus={false}
              dataSource={this.state.category1}
              fullWidth
              textFieldStyle={{ padding: 5 }}
              underlineShow={false}
            />
          </div>
          <div className="row">
            <TextField
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
              fullWidth
              underlineShow={false}
              style={{ flex: 1, padding: 5 }}
            />
          </div>
          <RaisedButton
            label="Choose an Image"
            labelPosition="before"
            style={styles.button}
            containerElement="label"
          >
            <input
              type="file"
              style={styles.exampleImageInput}
              onChange={this.handleChange}
            />
          </RaisedButton>
          {this.state.imagePreviewUrl
            ? <img
                className="image"
                src={this.state.imagePreviewUrl}
                alt="uploaded file"
              />
            : <center>please upload a file</center>}
          <RaisedButton
            type="submit"
            label="Let's go"
            labelColor="#ffab2f"
            style={{ margin: 10 }}
            onClick={this.handleClick}
          />
        </form>
      </div>
    );
  }
}

const styles = {
  button: {
    margin: "0 auto",
    maxWidth: 200
  },
  exampleImageInput: {
    cursor: "pointer",
    position: "absolute",
    opacity: 0
  }
};

export default Form;
