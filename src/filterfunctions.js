const moment = require('moment')
const filters  = {
    generalFilter:(params,values,single_person)=>{
            return single_person[params] === values
    },
  
    friends:(name,single_person)=>{
        return (single_person.friends.filter(single_friend =>single_friend.name === name).length > 0)
    },
    registeredRange:(range,single_person)=>{
        range = range.split('-')
       return moment(single_person.registered).utc().isBetween(range[0],range[1])

    },
  tags:(tags,single_person)=>{
         tags = tags.split(',')
        let regex = `/${tags.join('|')}/g`
        return [...single_person.tags.join(" ").matchAll(regex)].length > 0
    }
    
}
const Variable = ['tags','friends','registeredRange']

const filterFunction = (single_person,param) =>{
   let combi =   Object.keys(param).map(single_element =>Variable.includes(single_element) ? filters[single_element](param[single_element], single_person):filters.generalFilter(single_element,param[single_element],single_person))
   return combi.includes(false) ? false:true
}

module.exports = {filters,filterFunction}