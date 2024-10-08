/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as utils from '../src/utils';
import * as assert from 'assert';
import { ExpressInstrumentationConfig } from '../src/types';
import { ExpressLayer } from '../src/internal-types';
import { ExpressLayerType } from '../src/enums/ExpressLayerType';
import { AttributeNames } from '../src/enums/AttributeNames';

describe('Utils', () => {
  describe('isLayerIgnored()', () => {
    it('should not fail with invalid config', () => {
      assert.doesNotThrow(() =>
        utils.isLayerIgnored('', ExpressLayerType.MIDDLEWARE)
      );
      assert.doesNotThrow(() =>
        utils.isLayerIgnored(
          '',
          ExpressLayerType.MIDDLEWARE,
          {} as ExpressInstrumentationConfig
        )
      );
      assert.doesNotThrow(() =>
        utils.isLayerIgnored('', ExpressLayerType.MIDDLEWARE, {
          ignoreLayersType: {},
        } as ExpressInstrumentationConfig)
      );
      assert.doesNotThrow(() =>
        utils.isLayerIgnored('', ExpressLayerType.MIDDLEWARE, {
          ignoreLayersType: {},
          ignoreLayers: {},
        } as ExpressInstrumentationConfig)
      );
    });

    it('should ignore based on type', () => {
      assert.deepEqual(
        utils.isLayerIgnored('', ExpressLayerType.MIDDLEWARE, {
          ignoreLayersType: [ExpressLayerType.MIDDLEWARE],
        }),
        true
      );
      assert.deepEqual(
        utils.isLayerIgnored('', ExpressLayerType.ROUTER, {
          ignoreLayersType: [ExpressLayerType.MIDDLEWARE],
        }),
        false
      );
    });

    it('should ignore based on the name', () => {
      assert.deepEqual(
        utils.isLayerIgnored('bodyParser', ExpressLayerType.MIDDLEWARE, {
          ignoreLayers: ['bodyParser'],
        }),
        true
      );
      assert.deepEqual(
        utils.isLayerIgnored('bodyParser', ExpressLayerType.MIDDLEWARE, {
          ignoreLayers: [(name: string) => name === 'bodyParser'],
        }),
        true
      );
      assert.deepEqual(
        utils.isLayerIgnored('bodyParser', ExpressLayerType.MIDDLEWARE, {
          ignoreLayers: [/bodyParser/],
        }),
        true
      );
      assert.deepEqual(
        utils.isLayerIgnored('test', ExpressLayerType.ROUTER, {
          ignoreLayers: ['bodyParser'],
        }),
        false
      );
    });
  });

  describe('getLayerMetadata()', () => {
    it('should return router metadata', () => {
      assert.deepEqual(
        utils.getLayerMetadata(
          '/test',
          {
            name: 'router',
          } as ExpressLayer,
          '/test'
        ),
        {
          attributes: {
            [AttributeNames.EXPRESS_NAME]: '/test',
            [AttributeNames.EXPRESS_TYPE]: 'router',
          },
          name: 'router - /test',
        }
      );
    });

    it('should return request handler metadata', () => {
      assert.deepEqual(
        utils.getLayerMetadata(
          '/:id',
          {
            name: 'bound dispatch',
          } as ExpressLayer,
          '/:id'
        ),
        {
          attributes: {
            [AttributeNames.EXPRESS_NAME]: '/:id',
            [AttributeNames.EXPRESS_TYPE]: 'request_handler',
          },
          name: 'request handler',
        }
      );
    });

    it('should return middleware metadata', () => {
      assert.deepEqual(
        utils.getLayerMetadata('', {
          name: 'bodyParser',
        } as ExpressLayer),
        {
          attributes: {
            [AttributeNames.EXPRESS_NAME]: 'bodyParser',
            [AttributeNames.EXPRESS_TYPE]: 'middleware',
          },
          name: 'middleware - bodyParser',
        }
      );
    });
  });

  describe('reconstructRouterPath()', () => {
    it('should reconstruct a simple router path', () => {
      const layer = {
        handle: {
          stack: [
            {
              route: {
                path: '/test',
              },
            },
          ],
        },
      };

      assert.strictEqual(
        utils.getRouterPath('', layer as unknown as ExpressLayer),
        '/test'
      );
    });

    it('should reconstruct a parameterized router path', () => {
      const layer = {
        handle: {
          stack: [
            {
              handle: {
                stack: [
                  {
                    route: {
                      path: '/:id',
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      assert.strictEqual(
        utils.getRouterPath('', layer as unknown as ExpressLayer),
        '/:id'
      );
    });
  });
  describe('asErrorAndMessage', () => {
    it('should special case Error instances', () => {
      const input = new Error('message');
      const [error, message] = utils.asErrorAndMessage(input);
      assert.strictEqual(error, input);
      assert.strictEqual(message, 'message');
    });

    it('should pass strings as-is', () => {
      const input = 'error';
      const [error, message] = utils.asErrorAndMessage(input);
      assert.strictEqual(error, input);
      assert.strictEqual(message, input);
    });

    it('should stringify other types', () => {
      const input = 2;
      const [error, message] = utils.asErrorAndMessage(input);
      assert.strictEqual(error, '2');
      assert.strictEqual(message, '2');
    });
  });

  describe('getLayerPath', () => {
    it('should return path for a string route definition', () => {
      assert.strictEqual(utils.getLayerPath(['/test']), '/test');
    });

    it('should return path for a regex route definition', () => {
      assert.strictEqual(utils.getLayerPath([/^\/test$/]), '/^\\/test$/');
    });

    it('should return path for an array of route definitions', () => {
      assert.strictEqual(
        utils.getLayerPath([[/^\/test$/, '/test']]),
        '/^\\/test$/,/test'
      );
    });

    it('should return path for a mixed array of route definitions', () => {
      assert.strictEqual(
        utils.getLayerPath([[/^\/test$/, '/test', /^\/test$/]]),
        '/^\\/test$/,/test,/^\\/test$/'
      );
    });
  });
});
