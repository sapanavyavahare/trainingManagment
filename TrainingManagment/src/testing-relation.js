const { v4: uuidv4 } = require('uuid');
const models = require('./models');
const User = models.User;
const Company = models.Company;

Company.create({
    name: 'my super company',
    company_code: uuidv4(),
})
    .then((newCompany) => {
        console.log('new company ', newCompany.get());
        
    })
    .catch((err) => {
        console.log('Error while company creation : ', err);
    });
