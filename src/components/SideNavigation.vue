<template>
  <q-item
    v-if="expansion.length === 0"
    clickable
    v-ripple
    :to="link"
    active-class="my-menu-link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label
        v-if="caption"
        caption
      >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-expansion-item
    v-else
    clickable
    :content-inset-level="0.5"
    :label="title"
  >
    <q-item
      v-for="item in expansion"
      :key="item.id"
      v-bind="item"
      clickable
      v-ripple
      :to="item.link"
      active-class="my-menu-link"
    >
       <q-item-section
        v-if="item.icon"
        avatar
      >
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label
          v-if="item.caption"
          caption
        >
          {{ item.caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script>
export default {
  name: 'SideNavigation',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    expansion: {
      type: Array,
      default: [],
    },
  },
}
</script>
