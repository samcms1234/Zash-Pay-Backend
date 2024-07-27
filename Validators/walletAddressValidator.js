module.exports = {
    validator: function(v) {
      return /^0x[a-fA-F0-9]{40}$/.test(v);
    },
    message: props => `${props.value} is not a valid wallet address! It should start with 0x and be exactly 42 characters long.`
  };
  