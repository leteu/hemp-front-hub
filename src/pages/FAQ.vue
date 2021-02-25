<template>
  <div>
    <div class="q-py-md text-h5 text-bold">FAQ - 자주 묻는 질문</div>
    <q-list
      class="q-mb-sm"
      v-for="item in faq_data"
      :key="item.index"
    >
      <q-card class="my-card" flat bordered>
        <q-card-section @click="expanded === '' ? expanded = item.id : expanded === item.id ? expanded = '' : expanded = item.id" style="cursor:pointer; padding:0;">
          <div style="width:3%; height:100%;" class="float-left q-ml-md q-mr-lg q-pt-md">
            <q-icon name='live_help' style="font-size:3em" :color="expanded===item.id ? 'indigo-12' : 'grey'" />
          </div>
          <div style="width:88.3%" class="float-left">
            <div class="text-h6 q-mt-md q-mb-xs">{{item.asked_title}}</div>
          </div>
          <div>
            <q-btn
              v-model="expanded"
              color="grey"
              round
              flat
              dense
              dense-toggle
              :icon="expanded === item.id ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              size="30px"
              class="q-mr-lg"
            />
          </div>
        </q-card-section>

        <q-slide-transition>
          <div v-show="expanded === item.id">
            <q-separator />
            <q-card-section class="text-body1"  style="min-height:80px">
              <q-icon style="position:absolute; font-size:3em;" class="q-pl-xs" name="support_agent"></q-icon>
              <div style="width:80%; margin-left:5%">
                {{item.answer}}
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </q-list>
  </div>
</template>

<script>
export default {
  name:'FAQ',
  data(){
    return{
      expanded:'',
      faq_data:[
        {
          id:1,
          asked_title: '전입신고를 할 때 신고인의 자격과 필요한 준비물은요?',
          answer: `
                  전입신고를 할 때 신고인의 자격과 필요한 준비물은요? 또 며칠 안에 해야 하나요?

                  전입신고는 전입한 날로부터 14일 이내에 세대주가 신고를 하여야 하며 세대주가 할 수 없을 때에는 세대를 관리하는 자 또는 전입자 본인이 하여야 합니다.
                  전입신고서 작성시 세대주 및 신고인의 날인을 하고 전입해당자의 주민등록증을 제시하여야 합니다.
                `,
        },
        {
          id:2,
          asked_title: '주민등록등본이나 인감을 떼려고 합니다.',
          answer: `
                  주민등록등본이나 인감을 동행정복지센터에 가지 않고 뗄 수 있나요?

                  네, 주민등록등본은 전국 어느 동주민센터나 자동발급기가 설치되어 있는 지하철 역사 등에서 발급받을 수 있고,
                  또한 「대한민국전자정부」 사이트로 가시면 댁에서도 발급받으실 수 있습니다. 그러나 인감증명은 전국의 동행정복지센터에서만 발급이 가능합니다.
                `,
        },
        {
          id:3,
          asked_title: '인터넷으로 집에서 뗄 수 있는 서류는 무엇이 있나요?',
          answer: `
                  민원인이 직접 관공서를 방문할 필요없이 「대한민국전자정부」 민원창구에서 온라인으로 민원을 신청하는 서비스로는 주민등록 등·초본 등 400여 종의 민원을 처리하고 있습니다.
                  민원처리결과인 민원서류를 우편으로 받아보시거나, 가까운 행정기관에서 찾아가실 수 있습니다. 일부 민원은 제증명 서류를 인터넷상에서 열람하거나 직접 발급받아 사용하실 수 있습니다.
                `,
        },
        {
          id:4,
          asked_title: '호적, 제적등본을 떼려고 하는데요.',
          answer: `호적등본은 가까운 동행정복지센터에서 뗄 수 있습니다.
                  제적등본은 본적지로 팩스 민원으로 신청하여 약 3시간 정도가 소요됩니다.
                  필요한 것은 호주 성명, 본적지 주소와 오시는 분의 신분증입니다.
                  호적등본은 가까운 동행정복지센터에서 뗄 수 있습니다.
                  제적등본은 본적지로 팩스 민원으로 신청하여 약 3시간 정도가 소요됩니다.
                  필요한 것은 호주 성명, 본적지 주소와 오시는 분의 신분증입니다.
                  호적등본은 가까운 동행정복지센터에서 뗄 수 있습니다.
                  제적등본은 본적지로 팩스 민원으로 신청하여 약 3시간 정도가 소요됩니다.
                  필요한 것은 호주 성명, 본적지 주소와 오시는 분의 신분증입니다.
                  호적등본은 가까운 동행정복지센터에서 뗄 수 있습니다.
                  제적등본은 본적지로 팩스 민원으로 신청하여 약 3시간 정도가 소요됩니다.
                  필요한 것은 호주 성명, 본적지 주소와 오시는 분의 신분증입니다.
                `,
        },
        {
          id:5,
          asked_title: '답변이 한줄일 경우',
          answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                `,
        },
        {
          id:6,
          asked_title: '답변이 두줄일 경우',
          answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting,
                  
                `,
        },
        
      ]
    }
  },
  method:{

  }
}
</script>

<style>
</style>