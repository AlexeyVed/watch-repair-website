import * as validation from './index.js'

describe('Test client-side validation', () => {
   
    it('Email validation', () => {
        expect(validation.validateEmail('AAAA@AAAA')).toEqual('Invalid email address');
        expect(validation.validateEmail('AAAA@AAAA.AA')).toEqual(void 0);
        expect(validation.validateEmail(void 0)).toEqual(void 0);
    })

    it('Confirm email', () => {
        const testsValue = [
            { email: 'AAAAA@11111.uk', inputs: { email: 'AAAAA@11111.uk' }, expect: '' },
            { email: 'AAAAA@gmail.com', inputs: { email: 'AAAAA@yandex.ru' }, expect: 'Email does not match' },
            { email: 'AAAAA@11111.com', inputs: { email: 'AAAAA@11111.com' }, expect: '' }
        ]

        testsValue.forEach( test => {
            expect(validation.confirmEmail(test.email, test.inputs)).toEqual(test.expect);
        })
    })

    it('Validate password', () => {
        const testsValue = [
            { value: '1234', expect: 'Password must be over 5 symbols'},
            { value: '12345', expect: void 0},
            { value: '123456', expect: void 0},
            { value: 123456, expect: 'Password must be over 5 symbols'}
        ]

        testsValue.forEach( test => {
            expect(validation.validatePassword(test.value)).toEqual(test.expect);
        })
    })

    it('Confirm password', () => {
        const testsValue = [
            { password: '12345', inputs: { password: '12345' }, expect: void 0 },
            { password: 12345, inputs: { password: '12345' }, expect: 'Password does not match' },
            { password: '12345', inputs: { password: '1234' }, expect: 'Password does not match' },
            { password: 'aBcDe', inputs: { password: 'aBcDe' }, expect: void 0 }
        ]

        testsValue.forEach( test => {
            expect(validation.confirmPassword(test.password, test.inputs)).toEqual(test.expect);
        })
    })

    it('Required field', () => {
        const testsValue = [
            { value: void 0, expect: 'Required'},
            { value: '', expect: 'Required'},
            { value: '12345', expect: void 0},
            { value: 'asdasd', expect: void 0},
            { value: 123456, expect: void 0}
        ]

        testsValue.forEach( test => {
            expect(validation.required(test.value)).toEqual(test.expect);
        })
    })
  })