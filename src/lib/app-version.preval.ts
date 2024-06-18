import preval from 'next-plugin-preval';
import packageJSON from '../../package.json';

export default preval(packageJSON.version);
