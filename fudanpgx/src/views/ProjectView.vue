<template>
  <div class="container-wrapper">
    <div class="container"   :style="{background:subItem.color}" v-for="(subItem, subIndex) in projectLists" :key="subIndex">
      <div class="content-container" >
        <div class="sub-project" >
          <div class="sub-project-header">
            <h2 class="sub-project-name">{{subItem.name}}</h2>
            <div class="sub-project-intro">
              {{subItem.intro}}
            </div>
          </div>
          <div class="sub-project-item" style="position: relative" v-for="(item,index) in subItem.subList" :key="index">
              <div class="el-row">
                <div class="el-col-17" style="text-align: justify">
                  <h3 class="item-title">{{item.title}}</h3>
                  <p class="item-describe">
                    {{item.description}}
                  </p>
                </div>
                <div class="el-col-1"></div>
                <div class="el-col-6" style="display: flex;justify-content: center;align-items: center;">
                  <img :src="item.logo" style="width: 90%">
                </div>
              </div>
            <a :href="item.url" target="_blank" v-if="item.url">
              <div class="mask" >
                <div class="mask-text">
                  GO TO {{item.title}}
                </div>
              </div>
            </a>

          </div>

        </div>



      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectView",

  data(){
    return {
      projectLists: [
        {
          name:'1. Multi-omics Reference Materials',
          intro:'Multi-omics (or molecular phenomics) profiling at the genomic, transcriptomic, proteomic, and metabolomic levels is the cornerstone of high-throughput technologies for discovering biomarkers for precision medicine. However, the lack of quality control procedures of multi-omics profiling during data generation and data analysis can lead to false findings, raising serious concerns about the reliability of multi-omics studies.',
          subList:[
            {title:'1.1 Chinese Quartet',logo: './Project/quartet.webp' , description:'The Quartet Project provides publicly accessible multi-omics reference materials and practical tools to enhance the reproducibility and reliability of multi-omics results. Well-characterized multiomics reference materials and quality control metrics pertinent to precision medicine study purposes can be used to measure and mitigate technical variation, enabling more accurate cross-batch and cross-omics data integration in increasingly large-scale and longitudinal studies such as the International Human Phenome Project.', url:'https://chinese-quartet.org/'},
            {title:'1.2 Plasmix (plasma multi-omics reference material)',logo: './Project/plasmix.webp' , description:'The Plasmix project provides the community with Plasmix reference materials and corresponding reference datasets to improve reproducibility and reliability in clinical and biomedical research. One suite of Plasmix reference materials is composed of pooled plasma from healthy male (M) and female (F) volunteers in four types: male plasma (M), female plasma (F), a 1:3 mix of male to female plasma (X), and a 3:1 mix of male to female plasma (Y). Plasmix reference materials and datasets serve as universal quality control (QC) sources for inter-lab proficiency tests and longitudinal monitoring, promoting multi-omics data integration, especially in large-scale scenarios.', url:''},
            {title:'1.3 HCC1395/BL (Tumor Cell DNA Reference mMaterial)',logo: './Project/hcc1395.webp' , description:'The HCC1395/BL project primarily focuses on the development of multi-omics standard materials derived from the triple-negative breast cancer cell line HCC1395 and its paired B-lymphocyte line. This initiative encompasses the creation of tumor-paired standards for DNA, RNA, proteins, and metabolites.These materials are meticulously crafted to act as benchmarks for genetic and molecular studies, providing a dependable basis for subsequent analyses and ensuring the accuracy and reliability of research outcomes in the field of precision medicine.', url:'https://www.atcc.org/products/crl-2324'},
          ],
          color:'#ffffff'
        },
        {
          name:'2. Precision Treatment for Type 2 Diabetes',
          intro:'Multi-Omics-Driven Precision Drug Development and Application integrates genomics, transcriptomics, proteomics, and metabolomics to identify biomarkers and optimize drug responses. Through preclinical and clinical trials, such as those conducted for Chiglitazar, a PPARα/γ/δ pan-agonist used to treat type 2 diabetes, the research ensures that therapies are tailored to individual molecular profiles.',
          subList:[
            {title:'2.1 ChiHOPE',logo: './Project/chihope.webp' , description:'The high heterogeneity of current therapies for type 2 diabetes warrants an urgent need for precision medicine approaches, which take into account the patients’ biological characteristics and thus optimize disease management. The ChiHOPE project (Chiglitazar integrated Human multi-Omics ProfilE) is a longitudinal study with a cohort of 835 individuals from phase 3 trials of the glucose-lowering drug Chiglitazar. We aimed at benefiting precision medicine of type 2 diabetes with multi-omics profiling. We comprehensively revealed the molecular profiles under different therapeutic strategies and diabetes subgroups. Functional validation was conducted to study causal effects between candidate molecule and disease phenotypes by in vivo and in vitro models, and AI approaches were applied to construct models for predicting therapeutic efficacy with multi-omics features. For complete details on the project and results, please refer to http://chiglitazar.fudan-pgx.org.', url:'http://fudan-pgx.org/chihope/'},
          ],
          color:'#f7f7f7'
        },
        {
          name:'3. Caner Precision Medicine',
          intro:'Through multi-omics data integration (including genomics, transcriptomics, and proteomics), the group identifies biomarkers for disease diagnosis, prognosis, and personalized medicine, with a focus on cancer and other major diseases. Collaborative efforts have led to the development of precision molecular subtyping and targeted treatment strategies, such as for triple-negative breast cancer.',
          subList:[
            {title:'3.1 PreMedKB',logo: './Project/premedkb.webp' , description:'Precision medicine aims to tailor treatments to individual patients by considering their unique genetic traits. Despite challenges in accessing detailed data on diseases, drugs, and genetic variants, the Precision Medicine Knowledgebase (PreMedKB) was created. This tool integrates key components—diseases, genes, variants, and drugs—enabling comprehensive searches and analysis of their relationships. It helps in interpreting genetic profiles, identifying potential pathogenic variants, recommending treatments, designing genetic test panels, and matching patients for clinical trials, making it a valuable resource for researchers, clinicians, and patients. For complete details on this research, please refer to Yu et al. (2019).', url:'https://premedkb.cn/poi/#/'},
            {title:'3.2 Rat Bodymap',logo: './Project/ratbodymap.webp' , description:'The rat has been used extensively as a model for evaluating chemical toxicities and for understanding drug mechanisms. However, its transcriptome across multiple organs, or developmental stages, has not yet been reported. Here we show, as part of the SEQC consortium efforts, a comprehensive rat transcriptomic BodyMap created by performing RNA-Seq on 320 samples from 11 organs of both sexes of juvenile, adolescent, adult and aged Fischer 344 rats. We catalogue the expression profiles of 40,064 genes, 65,167 transcripts, 31,909 alternatively spliced transcript variants and 2,367 non-coding genes/non-coding RNAs (ncRNAs) annotated in AceView. We find that organ-enriched, differentially expressed genes reflect the known organ-specific biological activities. A large number of transcripts show organ-specific, age-dependent or sex-specific differential expression patterns. We create a web-based, open-access rat BodyMap database of expression profiles with crosslinks to other widely used databases, anticipating that it will serve as a primary resource for biomedical research using the rat model.', url:'http://pgx.fudan.edu.cn/ratbodymap/index.html'},
            {title:'3.3 Triple-Negative Breast Cancer',logo: './Project/tnbc.webp' , description:'We comprehensively analyzed clinical, genomic, and transcriptomic data of a cohort of 465 primary triple-negative breast cancer (TNBC). PIK3CA mutations and copy-number gains of chromosome 22q11 were more frequent in our Chinese cohort than in The Cancer Genome Atlas. We classified TNBCs into four transcriptome-based subtypes: (1) luminal androgen receptor (LAR), (2) immunomodulatory, (3) basal-like immune-suppressed, and (4) mesenchymal-like. Putative therapeutic targets or biomarkers were identified among each subtype. Importantly, the LAR subtype showed more ERBB2 somatic mutations, infrequent mutational signature 3 and frequent CDKN2A loss. The comprehensive profile of TNBCs provided here will serve as a reference to further advance the understanding and precision treatment of TNBC.', url:'http://fudan-pgx.3steps.cn/cdataportal/study/summary?id=FUSCC_BRCA_2022'},
            {title:'3.4 Glioma',logo: './Project/glioma.webp' , description:'Precision Medicine and Clinical Translation of Glioma: Integrating multi-modal data of genomics, clinical, and drug information, combined with bioinformatics analysis, to build a precise classification and treatment system for glioma.', url:''},
            {title:'3.5 Lung Adenocarcinoma',logo: './Project/lung.webp' , description:'Ground-glass opacity (GGO)-like lung adenocarcinoma (LUAD) has been detected increasingly in the clinic and its inert property and superior survival indicate unique biological characteristics. However, we do not know much about them, which hampers identification of key reasons for the inert property of GGO-like LUAD. Using whole-exome sequencing and RNA sequencing, taking into account both radiological and pathological classifications of the same 197 patients concomitantly, we systematically summarized genes driving the progression from GGO to solid nodule and potential reasons for the inertia of GGO. For complete details on this research, please refer to Shang et al. (2023).', url:''},

          ],
          color:'#ffffff'
        },
      ]
    }
  }
}
</script>

<style scoped>
#app, * {
  font-family: Helvetica;
}
.container {
  /*第一参数控制上下，第二个参数控制左右*/
  background-color: rgb(255, 255, 255);
  width: 70vw;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.1) 0vw 1vw 2vw 0vw;

  min-height: calc( 100vh);
  margin: 4vw auto;

}

.content-container {

  min-height: calc( 100vh);
}


.sub-project{
  padding: 1.2vw 1.4vw;
}

.sub-project-header {
  margin: 1.2vw 0;
}
.sub-project-name {
  text-align: center;margin: 1.2vw 0;
  font-size: 1.8vw;
}

.sub-project-intro{
  text-align: justify;
  padding: 0vw 1.4vw;
  font-size: 1.3vw;
  line-height: 2vw;
  opacity: 0.9;
}
.sub-project-item{
  padding: 1.4vw 1.6vw
}

.item-title {
  margin: 0.5vw 0;
  font-size: 1.6vw;
}

.item-describe {
  font-size: 1.2vw;
  line-height: 1.8vw;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(26,26,26,0.6);
  border-radius: 1.2vw;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
}

.mask:hover {
  opacity: 1;
}

.mask-text {
  font-size: 2vw;
  width:100%;
  font-weight: bold;
  color: white;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%)
}

a {
  text-decoration: none;  /* 去掉链接的下划线 */
  color: inherit;  /* 继承父元素的颜色 */
}

a:visited {
  color: inherit;  /* 点击后颜色保持不变 */
}

a:hover {
  color: inherit;  /* 悬停时颜色保持不变 */
}

a:active {
  color: inherit;  /* 活动状态时颜色保持不变 */
}







</style>