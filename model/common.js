const modelType = (type, required, ref, match, validate) => ({
  type,
  ...(ref && {ref}),
  ...(required ? {required}: {required:false}),
  ...(match && {match}),
  ...(validate && {validate}),
});

const validator = {
    validator: function (value) {
      const currentDate = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(currentDate.getFullYear() - 14);
      return value < minAgeDate;
    },
    message: "Age must be older than 14 years",
  }

module.exports = { modelType, validator };
