import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import mochaSnapshots from 'mocha-snapshots';
import { JSDOM } from 'jsdom';
import { expect, assert, should } from 'chai';
import { mount, render, shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

global.mount = mount;
global.sinon = sinon;
global.assert = assert;
global.render = render;
global.expect = expect;
global.should = should();
global.shallow = shallow;
global.mochaSnapshots = mochaSnapshots;
mochaSnapshots.setup({ sanitizeClassNames: false });

if (process.argv.includes('--silent')) {
    global.console.error = () => {};
    global.console.warn = () => {};
}

const dom = new JSDOM(`
<!doctype html>
<html>
    <head>
        <script/>
    </head>
    <body>
        </div>
    </body>
</html>
`);

const { window } = dom;
const { navigator } = dom;

require.extensions['.less', '.css'] = function () {
    return null;
};
