<script setup lang="ts">
import { ref, reactive, toRefs, computed } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { AutoImage } from "@ckeditor/ckeditor5-image";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { AutoLink } from "@ckeditor/ckeditor5-link";
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { Bold, Strikethrough } from "@ckeditor/ckeditor5-basic-styles";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { Code } from "@ckeditor/ckeditor5-basic-styles";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { DataFilter } from "@ckeditor/ckeditor5-html-support";
import { DataSchema } from "@ckeditor/ckeditor5-html-support";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { FontBackgroundColor } from "@ckeditor/ckeditor5-font";
import { FontColor } from "@ckeditor/ckeditor5-font";
import { FontFamily } from "@ckeditor/ckeditor5-font";
import { FontSize } from "@ckeditor/ckeditor5-font";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import {
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Link, LinkImage } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { ListProperties } from "@ckeditor/ckeditor5-list";
import { Markdown } from "@ckeditor/ckeditor5-markdown-gfm";
import {
  MediaEmbed,
  MediaEmbedToolbar,
  AutoMediaEmbed,
} from "@ckeditor/ckeditor5-media-embed";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { PageBreak } from "@ckeditor/ckeditor5-page-break";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from "@ckeditor/ckeditor5-special-characters";
import { StandardEditingMode } from "@ckeditor/ckeditor5-restricted-editing";
import { Style } from "@ckeditor/ckeditor5-style";
import { Subscript, Superscript } from "@ckeditor/ckeditor5-basic-styles";
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from "@ckeditor/ckeditor5-table";
import { TextPartLanguage } from "@ckeditor/ckeditor5-language";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { TodoList } from "@ckeditor/ckeditor5-list";
import { Underline } from "@ckeditor/ckeditor5-basic-styles";
import { WordCount } from "@ckeditor/ckeditor5-word-count";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";

const ckeditor = CKEditor.component;

interface IProps {
  ckeditorValue: string;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  readOnly: false,
});
const { ckeditorValue } = toRefs(props);

const emits = defineEmits<{
  (e: "get", value: string): void;
}>();

const editor = ClassicEditor;
const colors = [
  { color: "hsl(0, 0%, 0%)", label: " " },
  { color: "hsl(0, 0%, 25%)", label: " " },
  { color: "hsl(0, 0%, 37.5%)", label: " " },
  { color: "hsl(0, 0%, 50%)", label: " " },
  { color: "hsl(0, 0%, 62.5%)", label: " " },
  { color: "hsl(0, 0%, 75%)", label: " " },
  { color: "hsl(0, 0%, 100%)", label: " " },
  { color: "hsl(0, 100%, 20%)", label: " " },
  { color: "hsl(0, 100%, 30%)", label: " " },
  { color: "hsl(0, 100%, 40%)", label: " " },
  { color: "hsl(0, 100%, 50%)", label: " " },
  { color: "hsl(0, 100%, 60%)", label: " " },
  { color: "hsl(0, 100%, 70%)", label: " " },
  { color: "hsl(0, 100%, 80%)", label: " " },
  { color: "hsl(30, 100%, 20%)", label: " " },
  { color: "hsl(30, 100%, 30%)", label: " " },
  { color: "hsl(30, 100%, 40%)", label: " " },
  { color: "hsl(30, 100%, 50%)", label: " " },
  { color: "hsl(30, 100%, 60%)", label: " " },
  { color: "hsl(30, 100%, 70%)", label: " " },
  { color: "hsl(30, 100%, 80%)", label: " " },
  { color: "hsl(60, 100%, 20%)", label: " " },
  { color: "hsl(60, 100%, 30%)", label: " " },
  { color: "hsl(60, 100%, 40%)", label: " " },
  { color: "hsl(60, 100%, 50%)", label: " " },
  { color: "hsl(60, 100%, 60%)", label: " " },
  { color: "hsl(60, 100%, 70%)", label: " " },
  { color: "hsl(60, 100%, 80%)", label: " " },
  { color: "hsl(90, 100%, 20%)", label: " " },
  { color: "hsl(90, 100%, 30%)", label: " " },
  { color: "hsl(90, 100%, 40%)", label: " " },
  { color: "hsl(90, 100%, 50%)", label: " " },
  { color: "hsl(90, 100%, 60%)", label: " " },
  { color: "hsl(90, 100%, 70%)", label: " " },
  { color: "hsl(90, 100%, 80%)", label: " " },
  { color: "hsl(120, 100%, 20%)", label: " " },
  { color: "hsl(120, 100%, 30%)", label: " " },
  { color: "hsl(120, 100%, 40%)", label: " " },
  { color: "hsl(120, 100%, 50%)", label: " " },
  { color: "hsl(120, 100%, 60%)", label: " " },
  { color: "hsl(120, 100%, 70%)", label: " " },
  { color: "hsl(120, 100%, 80%)", label: " " },
  { color: "hsl(150, 100%, 20%)", label: " " },
  { color: "hsl(150, 100%, 30%)", label: " " },
  { color: "hsl(150, 100%, 40%)", label: " " },
  { color: "hsl(150, 100%, 50%)", label: " " },
  { color: "hsl(150, 100%, 60%)", label: " " },
  { color: "hsl(150, 100%, 70%)", label: " " },
  { color: "hsl(150, 100%, 80%)", label: " " },
  { color: "hsl(180, 100%, 20%)", label: " " },
  { color: "hsl(180, 100%, 30%)", label: " " },
  { color: "hsl(180, 100%, 40%)", label: " " },
  { color: "hsl(180, 100%, 50%)", label: " " },
  { color: "hsl(180, 100%, 60%)", label: " " },
  { color: "hsl(180, 100%, 70%)", label: " " },
  { color: "hsl(180, 100%, 80%)", label: " " },
  { color: "hsl(210, 100%, 20%)", label: " " },
  { color: "hsl(210, 100%, 30%)", label: " " },
  { color: "hsl(210, 100%, 40%)", label: " " },
  { color: "hsl(210, 100%, 50%)", label: " " },
  { color: "hsl(210, 100%, 60%)", label: " " },
  { color: "hsl(210, 100%, 70%)", label: " " },
  { color: "hsl(210, 100%, 80%)", label: " " },
  { color: "hsl(240, 100%, 20%)", label: " " },
  { color: "hsl(240, 100%, 30%)", label: " " },
  { color: "hsl(240, 100%, 40%)", label: " " },
  { color: "hsl(240, 100%, 50%)", label: " " },
  { color: "hsl(240, 100%, 60%)", label: " " },
  { color: "hsl(240, 100%, 70%)", label: " " },
  { color: "hsl(240, 100%, 80%)", label: " " },
  { color: "hsl(270, 100%, 20%)", label: " " },
  { color: "hsl(270, 100%, 30%)", label: " " },
  { color: "hsl(270, 100%, 40%)", label: " " },
  { color: "hsl(270, 100%, 50%)", label: " " },
  { color: "hsl(270, 100%, 60%)", label: " " },
  { color: "hsl(270, 100%, 70%)", label: " " },
  { color: "hsl(270, 100%, 80%)", label: " " },
  { color: "hsl(300, 100%, 20%)", label: " " },
  { color: "hsl(300, 100%, 30%)", label: " " },
  { color: "hsl(300, 100%, 40%)", label: " " },
  { color: "hsl(300, 100%, 50%)", label: " " },
  { color: "hsl(300, 100%, 60%)", label: " " },
  { color: "hsl(300, 100%, 70%)", label: " " },
  { color: "hsl(300, 100%, 80%)", label: " " },
  { color: "hsl(330, 100%, 20%)", label: " " },
  { color: "hsl(330, 100%, 30%)", label: " " },
  { color: "hsl(330, 100%, 40%)", label: " " },
  { color: "hsl(330, 100%, 50%)", label: " " },
  { color: "hsl(330, 100%, 60%)", label: " " },
  { color: "hsl(330, 100%, 70%)", label: " " },
  { color: "hsl(330, 100%, 80%)", label: " " },
];
const editorConfig = {
  plugins: [
    Alignment,
    AutoImage,
    Autoformat,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    DataFilter,
    DataSchema,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    // Markdown, // 用Markdown會讓內容不是html
    MediaEmbed,
    AutoMediaEmbed,
    // MediaEmbedToolbar, // 用這個可能會導致MediaEmbed報錯
    Mention,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    StandardEditingMode,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    TodoList,
    Underline,
    WordCount,
    Strikethrough,
    SimpleUploadAdapter,
  ],
  placeholder: "Type the content here!",
  toolbar: {
    items: [
      "heading",
      // '|',
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      // "outdent",
      // "indent",
      // "alignment",
      "|",
      // "link",
      // "imageUpload",
      // "mediaEmbed",
      "specialCharacters",
      // "insertTable",
      "undo",
      "redo",
      "|",
      // "blockQuote",
      // "code",
      "horizontalLine",
      "findAndReplace",
      "bulletedList",
      "numberedList",
      "todoList",
      // "outdent",
      // "indent",
      "|",
      "bold",
      "italic",
      "strikethrough",
      "underline",
      "subscript",
      "superscript",
      "|",
    ],
    shouldNotGroupWhenFull: true,
  },
  language: "zh",
  mediaEmbed: {
    previewsInData: true,
  },
  image: {
    toolbar: ["imageStyle:inline", "imageStyle:block", "imageStyle:side"],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  link: {
    addTargetToExternalLinks: true,
  },
  fontSize: {
    // 'default'是由網頁的默認樣式控制
    options: [
      "default",
      9,
      11,
      13,
      15,
      17,
      19,
      21,
      23,
      25,
      27,
      29,
      31,
      33,
      35,
      37,
      39,
      41,
      43,
      45,
    ],
  },
  fontFamily: {
    options: ["Noto Sans CJK TC"],
  },
  fontColor: {
    columns: 7,
    documentColors: 91,
    colors: [...colors],
  },
  fontBackgroundColor: {
    columns: 7,
    documentColors: 91,
    colors: [...colors],
  },
};

const editorData = computed({
  get() {
    return ckeditorValue.value;
  },
  set(ckeditorValue: string) {
    emits("get", ckeditorValue);
  },
});
</script>
<script lang="ts">
export default {
  name: "CkeditorComponent",
};
</script>
<template>
  <ckeditor
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
    name="content"
    :disabled="readOnly"
    :readonly="readOnly"
  />
</template>

<style>
.ck-editor__editable {
  min-height: 200px;
}

.ck-editor {
  width: 100% !important;
  padding-right: 13px;
}
</style>
