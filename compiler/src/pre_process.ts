/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ReplaceResult,
  sourceReplace,
  validateUISyntax,
  processSystemApi
} from './validate_ui_syntax';
import {
  LogInfo,
  emitLogInfo
} from './utils';
import { BUILD_ON } from './pre_define';

function preProcess(source: string): string {
  process.env.compiler = BUILD_ON;
  if (/\.ets$/.test(this.resourcePath)) {
    const result: ReplaceResult = sourceReplace(source, this.resourcePath);
    const newContent: string = result.content;
    const log: LogInfo[] = result.log.concat(validateUISyntax(source, newContent,
      this.resourcePath, this.resourceQuery));
    if (log.length) {
      emitLogInfo(this, log);
    }
    return newContent;
  } else {
    return processSystemApi(source);
  }
}

module.exports = preProcess;
