import React, { useEffect, useRef } from 'react';

export default () => {
  const wrapper = useRef();

  useEffect(() => {
    const bot = new window.ChatSDK({
      root: wrapper.current,

      config: {
        navbar: {
          title: '智能助理',
        },
        robot: {
          avatar: '//gw.alicdn.com/tfs/TB1U7FBiAT2gK0jSZPcXXcKkpXa-108-108.jpg',
        },
        messages: [
          {
            type: 'text',
            content: {
              text: '智能助理为您服务，请问有什么可以帮您？',
            },
          },
        ],
      },
      requests: {
        send: function (msg) {
          if (msg.type === 'text') {
            return {
              url: '//api.server.com/ask',
              data: {
                q: msg.content.text,
              },
            };
          }
        },
      },
      handlers: {
        parseResponse: function (res, requestType) {
          if (requestType === 'send' && res.Messages) {
            // 解析 ISV 消息数据
            return isvParser({ data: res });
          }

          return res;
        },
      },
    });

    bot.run();
  }, []);

  // 注意 wrapper 的高度
  return <div style={{ height: '100%' }} ref={wrapper} />;
};
