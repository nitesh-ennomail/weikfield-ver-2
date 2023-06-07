export const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
    object.target.value =
      !!object.target.value && Math.abs(object.target.value) >= 0
        ? Math.abs(object.target.value)
        : null;
  };