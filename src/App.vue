<script setup lang="ts">
import { ref } from "vue";
import CkeditorComponent from "@/components/CkeditorComponent.vue";
/*

參考資料
https://mauricius.github.io/vue-draggable-resizable/#/story/stories-basic-active-story-vue?variantId=_default

*/

// 主區域寬高
const mainAreaHeight = ref(500);
const mainAreaWidth = ref(500);

// 顯示背景輔助線
const isShowMainAreaBgLine = ref(true);
const handleMainAreaBgLine = () => {
  isShowMainAreaBgLine.value = !isShowMainAreaBgLine.value;
};
// 顯示背景邊線
const isShowMainAreaBgBorder = ref(true);
const handleMainAreaBgBorder = () => {
  isShowMainAreaBgBorder.value = !isShowMainAreaBgBorder.value;
};
// 顯示文字或圖片框邊線
const isShowContentBorder = ref(true);
const handleContentBorder = () => {
  isShowContentBorder.value = !isShowContentBorder.value;
};

// 控制主區域寬高
const handleMainAreaParameter = (
  x: number,
  y: number,
  w: number,
  h: number
) => {
  mainAreaWidth.value = w;
  mainAreaHeight.value = h;
};

// ckeditor
const ckeditorValue = ref("");
const getCkeditorValue = (val: string) => {
  ckeditorValue.value = val;
};

// 上傳圖片
const uploader = ref<HTMLInputElement | null>(null);
const activeImgSrc = ref("");
const choiceFileClick = () => {
  if (uploader.value) {
    uploader.value.click();
  }
};
const onChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;

  if (files && !files.length) {
    return;
  }
  if (files) {
    createFile(files[0]);
  }
};
const createFile = async (file: File) => {
  const imageExt = [".jpg", ".jpeg", ".png", ".gif"];
  const fileExt = file.name.substring(file.name.lastIndexOf("."));

  if (!imageExt.includes(fileExt)) {
    return;
  }

  activeImgSrc.value = await fileToBase64(file);
};

const resetImageUploader = () => {
  if (uploader.value) {
    uploader.value.value = "";
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error);
  });
};

// 新增背景圖
const bgcSrc = ref("");
const addBgcDialog = ref(false);
const addBgcDialogTitle = ref("");
const addBgcSubmitLoading = ref(false);
const openAddBgcDialog = () => {
  addBgcDialogTitle.value = "新增背景圖";
  addBgcDialog.value = true;
};

const addBgcSubmit = () => {
  bgcSrc.value = activeImgSrc.value;
  addBgcDialog.value = false;
};

// 編輯背景圖
const editorBgcDialog = ref(false);
const editorBgcDialogTitle = ref("");
const editorBgcSubmitLoading = ref(false);
const openEditorBgcDialog = () => {
  activeImgSrc.value = bgcSrc.value;
  editorBgcDialogTitle.value = "編輯背景圖";
  editorBgcDialog.value = true;
};

const editorBgcSubmit = () => {
  bgcSrc.value = activeImgSrc.value;
  editorBgcDialog.value = false;
};

// 刪除背景圖
const deleteBgcSubmit = () => {
  bgcSrc.value = "";
  resetDialog();
};

interface IContent {
  index: number;
  type: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 所有內容
const contentList = ref<IContent[]>([
  // {
  //   index: 0,
  //   type: "", // text img
  //   content: "",
  //   x: 0,
  //   y: 0,
  //   w: 150,
  //   h: 150,
  // },
]);
// 點擊次數 (連點兩次開啟編輯)
const clickCount = ref(0);
// 新增內容
const addDialog = ref(false);
const addDialogTitle = ref("");
const addSubmitLoading = ref(false);
const addType = ref("");
const openAddDialog = (type: string) => {
  addType.value = type;
  addDialogTitle.value = "新增";
  addDialog.value = true;
};
const addSubmit = () => {
  addSubmitLoading.value = true;

  setTimeout(() => {
    const item = {
      index: contentList.value.length,
      type: addType.value,
      content: "",
      x: 0,
      y: 0,
      w: 150,
      h: 150,
    };

    if (addType.value === "text") {
      item.content = ckeditorValue.value;
    }
    if (addType.value === "img") {
      item.content = activeImgSrc.value;
    }

    contentList.value.push(item);
    resetDialog();
    addSubmitLoading.value = false;
  }, 200);
};
// 編輯
const editorDialog = ref(false);
const editorDialogTitle = ref("");
const editorSubmitLoading = ref(false);
const editorType = ref("");
const editorIndex = ref(0);
const openEditorDialog = (item: IContent) => {
  clickCount.value++;

  let timer;
  if (clickCount.value === 1) {
    timer = window.setTimeout(() => {
      clickCount.value = 0;
    }, 200);
  } else if (clickCount.value >= 2) {
    clearTimeout(timer);
    editorType.value = item.type;
    if (editorType.value === "text") {
      ckeditorValue.value = item.content;
    }
    if (editorType.value === "img") {
      activeImgSrc.value = item.content;
    }
    editorIndex.value = item.index;
    editorDialogTitle.value = "編輯";
    editorDialog.value = true;
  }
};
const editorSubmit = () => {
  editorSubmitLoading.value = true;

  setTimeout(() => {
    if (editorType.value === "text") {
      contentList.value[editorIndex.value].content = ckeditorValue.value;
    }
    if (editorType.value === "img") {
      contentList.value[editorIndex.value].content = activeImgSrc.value;
    }

    resetDialog();
    editorSubmitLoading.value = false;
  }, 200);
};
// 刪除
const deleteSubmit = () => {
  contentList.value.splice(editorIndex.value, 1);

  contentList.value = contentList.value.map((item, index) => {
    const newItem = { ...item, index };
    return newItem;
  });
  resetDialog();
};

const resetDialog = () => {
  addBgcDialog.value = false;
  editorBgcDialog.value = false;
  addDialog.value = false;
  editorDialog.value = false;

  ckeditorValue.value = "";
  activeImgSrc.value = "";
  clickCount.value = 0;
};

// 當前被點中的content
const activeIndex = ref(0);

const setActivated = (index: number) => {
  activeIndex.value = index;
};

// 控制寬高和位置
const handleContentParameter = (x: number, y: number, w: number, h: number) => {
  // 拖曳的時候 w和h都是undefined
  if (!w && !h) {
    contentList.value[activeIndex.value].x = x;
    contentList.value[activeIndex.value].y = y;
  } else {
    contentList.value[activeIndex.value].x = x;
    contentList.value[activeIndex.value].y = y;
    contentList.value[activeIndex.value].w = w;
    contentList.value[activeIndex.value].h = h;
  }
};

// 儲存模板
const saveTemplate = () => {
  const storageItem = JSON.stringify({
    mainAreaHeight: mainAreaHeight.value,
    mainAreaWidth: mainAreaWidth.value,
    bgcSrc: bgcSrc.value,
    contentList: contentList.value,
  });

  localStorage.setItem("template", storageItem);
};

// 獲取模板
const getTemplate = () => {
  if (!localStorage.getItem("template")) {
    window.alert("查無模板");
    return;
  }

  const item = JSON.parse(localStorage.getItem("template") ?? "");
  mainAreaHeight.value = item.mainAreaHeight;
  mainAreaWidth.value = item.mainAreaWidth;
  bgcSrc.value = item.bgcSrc;
  contentList.value = item.contentList;
};
</script>

<template>
  <div>
    <button
      v-if="!isShowMainAreaBgLine"
      class="btn-style"
      @click="handleMainAreaBgLine"
    >
      開啟背景輔助線
    </button>
    <button
      v-if="isShowMainAreaBgLine"
      class="btn-style"
      @click="handleMainAreaBgLine"
    >
      關閉背景輔助線
    </button>
    <button
      v-if="!isShowMainAreaBgBorder"
      class="btn-style"
      @click="handleMainAreaBgBorder"
    >
      開啟背景邊框
    </button>
    <button
      v-if="isShowMainAreaBgBorder"
      class="btn-style"
      @click="handleMainAreaBgBorder"
    >
      關閉背景邊框
    </button>
    <button v-if="!bgcSrc" class="btn-style" @click="openAddBgcDialog">
      新增背景圖
    </button>
    <button v-if="bgcSrc" class="btn-style" @click="openEditorBgcDialog">
      編輯背景圖
    </button>
  </div>
  <div>
    <button class="btn-style" @click="openAddDialog('text')">新增文字框</button>
    <button class="btn-style" @click="openAddDialog('img')">新增圖片框</button>
    <button
      v-if="!isShowContentBorder"
      class="btn-style"
      @click="handleContentBorder"
    >
      開啟內容邊框
    </button>
    <button
      v-if="isShowContentBorder"
      class="btn-style"
      @click="handleContentBorder"
    >
      關閉內容邊框
    </button>
  </div>
  <div>
    <button class="btn-style" @click="getTemplate">獲取模板</button>
    <button class="btn-style" @click="saveTemplate">儲存模板</button>
  </div>
  <div>
    <span>{{ `寬:${mainAreaWidth} 高:${mainAreaHeight}` }}</span>
  </div>

  <vue-draggable-resizable
    :style="{
      position: 'relative',
      background: isShowMainAreaBgLine
        ? 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)'
        : '',
      backgroundSize: isShowMainAreaBgLine ? '20px 20px, 20px 20px' : '',
      border: isShowMainAreaBgBorder ? '1px solid blue' : 'none',
      margin: '1em',
      boxSizing: 'content-box',
    }"
    :draggable="false"
    :w="mainAreaWidth"
    :h="mainAreaHeight"
    @resizing="handleMainAreaParameter"
    @resizeStop="handleMainAreaParameter"
  >
    <div
      :style="{
        width: `${mainAreaWidth}px`,
        height: `${mainAreaHeight}px`,
        position: 'relative',
        overflow: 'hidden',
      }"
    >
      <vue-draggable-resizable
        v-for="(item, index) in contentList"
        :key="index"
        :style="{
          border: isShowContentBorder ? '' : 'none',
        }"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        @click="openEditorDialog(item)"
        @dragging="handleContentParameter"
        @dragStop="handleContentParameter"
        @resizing="handleContentParameter"
        @resizeStop="handleContentParameter"
        @activated="setActivated(index)"
      >
        <div
          v-if="item.type === 'text'"
          v-dompurify-html="item.content"
          :style="{ wordWrap: 'break-word', textAlign: 'left' }"
        />
        <div v-if="item.type === 'img'">
          <img :src="item.content" alt="" :style="{ width: '100%' }" />
        </div>
      </vue-draggable-resizable>
      <img
        :style="{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
          width: '100%',
          mixBlendMode: 'multiply' /* 圖片與背景混合 */,
        }"
        :src="bgcSrc"
        alt=""
      />
    </div>
  </vue-draggable-resizable>

  <!-- 新增背景圖 dialog -->
  <div v-if="addBgcDialog" class="add-bgc-dialog">
    <h2>{{ addBgcDialogTitle }}</h2>
    <div :style="{ marginBottom: '20px' }">
      <input
        ref="uploader"
        type="file"
        accept="image/*"
        :style="{ display: 'none' }"
        @click="resetImageUploader"
        @change="onChange"
      />
      <button @click="choiceFileClick" class="btn-style">上傳圖片</button>
      <br />
      <img v-if="activeImgSrc" :src="activeImgSrc" alt="" class="preview-img" />
    </div>
    <div>
      <button
        class="btn-style"
        @click="resetDialog"
        :disabled="addBgcSubmitLoading"
      >
        取消
      </button>
      <button
        class="btn-style"
        @click="addBgcSubmit"
        :disabled="addBgcSubmitLoading"
      >
        確認
      </button>
    </div>
  </div>
  <!-- 編輯背景圖 dialog -->
  <div v-if="editorBgcDialog" class="editor-bgc-dialog">
    <h2>{{ editorBgcDialogTitle }}</h2>
    <div :style="{ marginBottom: '20px' }">
      <input
        ref="uploader"
        type="file"
        accept="image/*"
        :style="{ display: 'none' }"
        @click="resetImageUploader"
        @change="onChange"
      />
      <button @click="choiceFileClick" class="btn-style">上傳圖片</button>
      <br />
      <img v-if="activeImgSrc" :src="activeImgSrc" alt="" class="preview-img" />
    </div>
    <div>
      <button
        class="btn-style"
        @click="resetDialog"
        :disabled="editorBgcSubmitLoading"
      >
        取消
      </button>
      <button
        class="btn-style"
        @click="deleteBgcSubmit"
        :disabled="editorSubmitLoading"
      >
        刪除
      </button>
      <button
        class="btn-style"
        @click="editorBgcSubmit"
        :disabled="editorBgcSubmitLoading"
      >
        確認
      </button>
    </div>
  </div>
  <!-- 新增文字或圖片框 dialog -->
  <div v-if="addDialog" class="add-dialog">
    <h2>{{ addDialogTitle }}</h2>
    <div
      v-if="addType === 'text'"
      :style="{ width: '80%', marginBottom: '20px' }"
    >
      <CkeditorComponent
        :ckeditorValue="ckeditorValue"
        @get="getCkeditorValue"
      ></CkeditorComponent>
    </div>
    <div v-if="addType === 'img'" :style="{ marginBottom: '20px' }">
      <input
        ref="uploader"
        type="file"
        accept="image/*"
        :style="{ display: 'none' }"
        @click="resetImageUploader"
        @change="onChange"
      />
      <button @click="choiceFileClick" class="btn-style">上傳圖片</button>
      <br />
      <img v-if="activeImgSrc" :src="activeImgSrc" alt="" class="preview-img" />
    </div>
    <div>
      <button
        class="btn-style"
        @click="resetDialog"
        :disabled="addSubmitLoading"
      >
        取消
      </button>
      <button class="btn-style" @click="addSubmit" :disabled="addSubmitLoading">
        確認
      </button>
    </div>
  </div>
  <!-- 編輯文字或圖片框 dialog -->
  <div v-if="editorDialog" class="editor-dialog">
    <h2>{{ editorDialogTitle }}</h2>
    <div
      v-if="editorType === 'text'"
      :style="{ width: '80%', marginBottom: '20px' }"
    >
      <CkeditorComponent
        :ckeditorValue="ckeditorValue"
        @get="getCkeditorValue"
      ></CkeditorComponent>
    </div>
    <div v-if="editorType === 'img'" :style="{ marginBottom: '20px' }">
      <input
        ref="uploader"
        type="file"
        accept="image/*"
        :style="{ display: 'none' }"
        @click="resetImageUploader"
        @change="onChange"
      />
      <button @click="choiceFileClick" class="btn-style">上傳圖片</button>
      <br />
      <img v-if="activeImgSrc" :src="activeImgSrc" alt="" class="preview-img" />
    </div>
    <div>
      <button
        class="btn-style"
        @click="resetDialog"
        :disabled="editorSubmitLoading"
      >
        取消
      </button>
      <button
        class="btn-style"
        @click="deleteSubmit"
        :disabled="editorSubmitLoading"
      >
        刪除
      </button>
      <button
        class="btn-style"
        @click="editorSubmit"
        :disabled="editorSubmitLoading"
      >
        確認
      </button>
    </div>
  </div>
</template>
<style>
.btn-style {
  border: 1px solid #000;
  margin: 5px;
}
.preview-img {
  max-width: 500px;
  max-height: 500px;
  object-fit: contain;
  background-color: #fff;
}
.add-dialog,
.add-bgc-dialog,
.editor-bgc-dialog,
.editor-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  overflow: auto;
  background: #fff;
}
</style>
