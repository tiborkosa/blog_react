export default (name, value, rules) => {
        if(rules.required && value.trim() === ''){
            return `${name} is required!`;
        }
        if(rules.number && isNaN(value.trim()) ){
            return `${name} must be a number!`;
        }
        if(rules.min){ 
            if(isNaN(value) && value.length <= rules.min){
                return `${name} must be longer than ${rules.min} characters!`;
            }else if(!isNaN(value) && value <= rules.min){
                return `${name} must be greater than ${rules.min}!`;
            }
        }
        if(rules.max){
            if(isNaN(value) && value.length >= rules.max){
                return `${name} must be shorter than ${rules.max} characters!`;
            } else if(!isNaN(value) && value >= rules.max){
                return `${name} must be less than ${rules.max}!`;
            }
        } 
        if(name === 'Email'){
            if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)){
                return `${name} is invalid!`;
            }
        }
        return '';
}
