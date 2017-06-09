// @flow

function  isSpecialChar(str: string){
  return /[`!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]+/.test( str );
}

export function validateProjectName(name: ?string){
  if(!name || name.replace(/ /g,'').length === 0){
    return 'This field cannot be empty';
  }

  if(name.length > 100){
    return 'name cannot be longer than 100 characters'
  }
  // first letter must not contain special characters
  if(isSpecialChar(name.charAt(0))){
    return 'First character of name must be a standard English alphabetic character';
  }
  return null;
}


export function validateProjectDescription(description: ?string){
  if(!description || description.replace(/ /g,'').length === 0){
    return 'Must provide description'
  }
  if(description.length > 300){
    return 'description cannot be longer than 300 characters'
  }

  return null;
}
