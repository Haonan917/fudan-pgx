<template>
  <div style="width: 100%;background-color: #f0f2f5;min-height: 100vh;height: auto">
    <div style="margin: 0 10vw;background-color: white;min-height: 100vh;padding: 0 5vw">
      <div class="el-row" style="text-align: justify;padding-top: 5vh">
        <div style="margin-bottom: 2vh">Our multi-omics datasets included the ChiHOPE dataset, the NSPT dataset and the PRG4 dataset.</div>
        <div class="rowCell">
          <h3 class="form-title">The ChiHOPE dataset</h3>
          <div>
            Raw data (genomics, methylomics, miRNAomics, proteomics, targeted and untargeted metabolomics) have been deposited at Open Archive for Miscellaneous Data (OMIX) or Genome Sequence Archive for Human (GSA-Human) as PRJCA026766 and are publicly available as of the date of publication. Raw and analyzed data have also been deposited at National Omics Data Encyclopedia (NODE, <a href=https://www.biosino.org/node>https://www.biosino.org/node</a>) and are publicly available as of the date of publication at the accession number OEP00002924 or through the URL: <a href="https://www.biosino.org/node/project/detail/OEP00002924">https://www.biosino.org/node/project/detail/OEP00002924</a>.
          </div>
        </div>
        <div class="rowCell">
          <h3 class="form-title">The NSPT dataset</h3>
          <div>
            Raw data (miRNAomics and targeted metabolomics) have been deposited at OMIX or GSA-Human as PRJCA033704 and are publicly available as of the date of publication. Raw and analyzed data have also been deposited at NODE (https://www.biosino.org/node) and are publicly available as of the date of publication at the accession number OEP00005910 or through the URL: <a href="https://www.biosino.org/node/project/detail/OEP00005910">https://www.biosino.org/node/project/detail/OEP00005910</a>.
          </div>
        </div>
        <div class="rowCell">
          <h3 class="form-title">The PRG4 dataset</h3>
          <div>
            Transcriptomic data of PRG4 wild type and knock out Hep3B cell lines have been deposited at Sequence Read Archive (SRA) as PRJNA1193864 and are publicly available as of the date of publication. Raw data have also been deposited at NODE (https://www.biosino.org/node) and are publicly available as of the date of publication at the accession number OEP00005897 or through the URL: <a href="https://www.biosino.org/node/project/detail/OEP00005897">https://www.biosino.org/node/project/detail/OEP00005897</a>.
          </div>
        </div>

        <div class="el-col-24" style="margin-bottom: 10vh;margin-top: 5vh">
          <el-table :data="tableData" border stripe style="width: 100%" :span-method="mergeCells">
            <el-table-column prop="project" label="Project" width="200" />
            <el-table-column prop="dataset" label="Dataset" width="300" />
            <el-table-column label="NODE">
              <el-table-column prop="nodeProjectId" label="Project ID" width="150" />
              <el-table-column prop="experimentId" label="Experiment ID" width="200" />
            </el-table-column>
            <el-table-column label="Other repository">
              <el-table-column prop="otherProjectId" label="Project ID" width="150" />
              <el-table-column prop="repositoryName" label="Repository Name" width="150" />
              <el-table-column prop="accessionId" label="Accession ID" width="200" />
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE Genomics",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00014946",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-OMIX",
          accessionId: "OMIX007983",
        },
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE Methylomics",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00029669",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-OMIX",
          accessionId: "OMIX007967",
        },
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE MiRNAomics",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00016889",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-Human",
          accessionId: "HRA007610",
        },
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE Proteomics",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00016895",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-OMIX",
          accessionId: "",
        },
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE Metabolomics (NMR)",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00029672",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-OMIX",
          accessionId: "",
        },
        {
          project: "The ChiHOPE project",
          dataset: "ChiHOPE Metabolomics (LC-MS/MS)",
          nodeProjectId: "OEP0002924",
          experimentId: "OEX00029782",
          otherProjectId: "PRJCA026766",
          repositoryName: "GSA-OMIX",
          accessionId: "OMIX008286",
        },
        {
          project: "The NSPT project",
          dataset: "NSPT Methylomics",
          nodeProjectId: "OEP0005910",
          experimentId: "NA",
          otherProjectId: "PRJCA033704",
          repositoryName: "NA",
          accessionId: "NA",
        },
        {
          project: "The NSPT project",
          dataset: "NSPT MiRNAomics",
          nodeProjectId: "OEP0005910",
          experimentId: "NA",
          otherProjectId: "PRJCA033704",
          repositoryName: "GSA-Human",
          accessionId: "",
        },
        {
          project: "The NSPT project",
          dataset: "NSPT Proteomics",
          nodeProjectId: "OEP0005910",
          experimentId: "NA",
          otherProjectId: "PRJCA033704",
          repositoryName: "NA",
          accessionId: "NA",
        },
        {
          project: "The NSPT project",
          dataset: "NSPT Metabolomics (LC-MS/MS)",
          nodeProjectId: "OEP0005910",
          experimentId: "OEX00029711",
          otherProjectId: "PRJCA033704",
          repositoryName: "GSA-OMIX",
          accessionId: "OMIX008282",
        },
        {
          project: "The PRG4 project",
          dataset: "Hep3B Transcriptomics",
          nodeProjectId: "OEP0005897",
          experimentId: "OEX00029698",
          otherProjectId: "PRJNA1193864",
          repositoryName: "SRA",
          accessionId: "PRJNA1193864",
        },
      ],
    };
  },
  methods: {
    mergeCells({ row, column, rowIndex, columnIndex }) {
      console.log(row, columnIndex)
      // 合并 "Project" 列
      if (column.property === "project") {
        if (rowIndex === 0) return { rowspan: 6, colspan: 1 }; // The ChiHOPE project 合并6行
        if (rowIndex === 6) return { rowspan: 4, colspan: 1 }; // The NSPT project 合并4行
        if (rowIndex === 10) return { rowspan: 1, colspan: 1 }; // The PRG4 project 合并1行
        return { rowspan: 0, colspan: 0 }; // 不显示单元格
      }

      // 合并 "NODE -> Project ID" 列
      if (column.property === "nodeProjectId") {
        if (rowIndex === 0) return { rowspan: 6, colspan: 1 }; // OEP0002924 合并6行
        if (rowIndex === 6) return { rowspan: 4, colspan: 1 }; // OEP0005910 合并4行
        if (rowIndex === 10) return { rowspan: 1, colspan: 1 }; // OEP0005897 合并1行
        return { rowspan: 0, colspan: 0 }; // 不显示单元格
      }

      // 合并 "Other repository -> Project ID" 列
      if (column.property === "otherProjectId") {
        if (rowIndex === 0) return { rowspan: 6, colspan: 1 }; // PRJCA026766 合并6行
        if (rowIndex === 6) return { rowspan: 4, colspan: 1 }; // PRJCA033704 合并4行
        if (rowIndex === 10) return { rowspan: 1, colspan: 1 }; // PRJNA1193864 合并1行
        return { rowspan: 0, colspan: 0 }; // 不显示单元格
      }
    },
  },
};
</script>

<style scoped>
.form-title {
  margin-bottom: 0.8vw;
  font-size: 1.5vw
}

.form-input {
  width: 30vw;
  height: 3.2vw;
  font-size: 1.4vw;
  line-height: 3.2vw
}

>>>.el-input__wrapper{
  padding: 0.1vw 1vw !important;
}

>>>.el-input{
  --el-input-border-radius:0.2vw !important;
  --el-border-width:0.1vw !important
}

.rowCell {
  margin:1vw 0 ;
}
</style>