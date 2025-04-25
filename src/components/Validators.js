const EMAIL_PATTERN =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

//front validator MUST be equal to back validators
const noteValidators = {
  title: (value) => {
    let message;
    if (!value) {
      message = "Title is required";
    }
    return message;
  },

  description: (value) => {
    let message;
    if (!value) {
      message = "Description is required";
    }
    return message;
  },

  dueDate: (value) => {
    let message;
    if (!value) {
      message = "Due date is required";
    }
    return message;
  },
};

const userValidators = {
  username: (value) => {
    let message;
    if (!value) {
      message = "Username is required";
    }
    return message;
  },

  image: (value) => {
    let message;
    if (value.length > 1000) {
      message = "Invalid image!";
    }
    return message;
  },

  email: (value) => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid Email";
    }
    return message;
  },

  password: (value) => {
    let message;
    if (!value) {
      message = "Password is required";
    } else if (value.length < 5) {
      message = "5 characters minimun";
    }
    return message;
  },
};

export { noteValidators, userValidators };
