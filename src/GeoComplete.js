import React, { Component, PropTypes } from "react";
import { TextField } from "material-ui";

export default class AddressAutocomplete extends Component {
  static propTypes = {
    value: PropTypes.string,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    onChange: PropTypes.func
  };

  componentWillMount() {
    this.setState({ value: this.props.value || "" });
  }

  componentDidMount() {
    const input = document.getElementById("addressAutocompleteField");
    const options = {
      types: ["address"]
    };
    const geoAutocomplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    geoAutocomplete.addListener("place_changed", () => {
      const selectedPlace = geoAutocomplete.getPlace();

      this.props.onChange(selectedPlace);
    });
  }

  _handleChange = (event, value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TextField
        id="addressAutocompleteField"
        floatingLabelText={this.props.floatingLabelText}
        hintText={this.props.hintText}
        value={this.state.value}
        onChange={this._handleChange}
        style={{ padding: 5 }}
        underlineShow={false}
        placeholder=""
        fullWidth
      />
    );
  }
}
