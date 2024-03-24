const customError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
if(requestUser.role === 'admin') return;
if(requestUser.userId === resourceUserId.toString()) return;
throw new customError.UnauthorizedError('Not authorized to view the user details');
}

module.exports = checkPermissions;