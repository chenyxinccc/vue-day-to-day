/**
 * 酷利
 * http://qunee.com/
 * @author chenyx 2018-8-6
 */
/*eslint-disable*/
import './qunee-2.6.0.4'
import { images } from './images'
Q.Defaults.FONT_FAMILY = '"宋体", "微软雅黑", "Microsoft YaHei"'
Q.Defaults.FONT_SIZE = 12
Q.Defaults.TOOLTIP_DELAY = 300
Q.Defaults.TOOLTIP_DURATION = 3000
Q.Defaults.NAVIGATION_TYPE = Q.Consts.NAVIGATION_NONE
Object.keys(images).forEach((name) => {
  if (!Q.hasImage(name)) {
    Q.registerImage(name, images[name])
  }
})

export default Q
