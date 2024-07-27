module.exports = {
    validator: function(v) {
      return /^\d{12}$/.test(v);
    },
    message: props => `${props.value} is not a valid Aadhar number! It should be exactly 12 digits.`
  };
  