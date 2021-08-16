export const isValidPhoneNumber = (phone,callback) => {
    if (!phone) {
        return callback({
          success: false,
          message: "Missing phone number",
        });
      }
      if (phone.length !== 10 && !isNaN(phone)) {
        return callback({
          success: false,
          message: "Invalid Phone Number",
        });
      }
    
      return callback({
        success: true,
        message: "Valid Phone Number",
      });
}

