import queryString from 'query-string';

export default function(props){
  return queryString.parse(props.location.search).page
}
