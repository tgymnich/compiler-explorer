import request from 'request';

import { BaseShortener } from './base';

export class FwdShortener extends BaseShortener {
    static get key() { return 'fwd'; }

    handle(req, res) {
        const url = `${req.protocol}://${req.get('host')}#${req.body.config}`;
        const options = {
            url: 'https://fwd.gymni.ch/shorten',
            json: { url: encodeURIComponent(url) },
            method: 'POST',
        };
        const callback = (err, resp, body) => {
            if (!err && resp.statusCode === 200) {
                console.log(body)
                res.send({url: body["url"]});
            } else {
                res.status(resp.statusCode).send(resp.error);
            }
        };
        request.post(options, callback);
    }
}