export function list(query, success, fail, complete, others) {
          const app = getApp();
          const config = Object.assign({}, {"url":"///appointment/project/online/list","headers":{"atk":""},"method":"GET","dataType":"json"},{ headers: Object.assign({}, {"atk":""}, { atk: query.atk})})
          delete query.atk
          let _query = query;
          config.headers["content-type"] = config.headers["Content-Type"]
          if(config.headers["content-type"] === "application/json" ) {
            _query = JSON.stringify(_query)
          }
          delete config.headers["Content-Type"]
          const _others = Object.assign({timeout: 3000}, others);
          const options = Object.assign({}, config, {data: _query}, _others, {
              success: resp => {
                const data = resp.data || {}
                if (data.code == '0') {
                  success && success(data.data, data)
                } else if (data.code == '50102') {
                  // token失效 重新获取鉴权 重新调用数据
                  app.checkAuth('auth_base').then(({ token = '' }) => {
                    // 数据更新
                    app.CONSTANTS.atk = token
                    my.request(Object.assign({}, {"url":"///appointment/project/online/list","headers":{"atk":""},"method":"GET","dataType":"json"}, {data: query}, others,
                    {
                      success: responese => {
                        const data_ = responese.data || {}
                        success(data_.data, data_)
                      },
                      fail: fail || function(err){
                          my.showToast({
                              type: 'fail',
                              content: err.msg || '系统异常,请稍后再试'
                          })
                      },
                      complete: complete
                    }
                    ))
                  }).catch((e) => {
                    my.showToast({ content: '系统异常' })
                  })
                }else {
                  fail(data, resp)
                }
              },
              fail: fail || function(err, resp){
                  my.showToast({
                      type: 'fail',
                      content: err.msg || '系统异常,请稍后再试'
                  })
              },
              complete: complete,
          })
          return (my.httpRequest || my.request)(options)
      }
      