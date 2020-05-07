import moxios from 'moxios';
import { storeFactory } from '../Test/TestUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    })

    test('add response word to state', () => {
        const secrectWord = 'party';
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:secrectWord
            });
        });
        return store.dispatch(getSecretWord())
        .then(() => {
            const newState = store.getState();
            expect(newState.secretWord).toBe(secrectWord);
        })
    });

});