const express = require('express')
const sqlConnect = require('../utils/mysql')
const GeneRouter = express.Router()

const sqlBuilder = {
	gene: (chromosome, start, end) => {
		return `SELECT * FROM uniq_new_gene_all_info WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
	},
	geneAll: (chromosome, start, end) => {
		return `SELECT * FROM chm13_gene WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
	},
	histone: (chromosome, start, end) => {
		return `SELECT * FROM new_histone WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
	},
	variation: (chromosome, start, end) => {
		return `SELECT * FROM new_variation WHERE chr_ID = '${chromosome}' AND POS >= '${start}' AND POS <= '${end}';`
	},
}

GeneRouter.get('/', async (req, res) => {
	res.send('<h1>FUCK YOU!</h1>')
})

GeneRouter.get('/locus', async (req, res) => {
	let { chromosome, start, end } = req.query
	const genes = await sqlConnect(sqlBuilder.gene(chromosome, start, end))
	const histone = await sqlConnect(sqlBuilder.histone(chromosome, start, end))
	const variation = await sqlConnect(sqlBuilder.variation(chromosome, start, end))
	const geneAll = await sqlConnect(sqlBuilder.geneAll(chromosome, start, end))

	const biotype = {}
	for (let i = 0; i < geneAll.length; i++) {
		if (biotype[geneAll[i].gene_biotype]) {
			biotype[geneAll[i].gene_biotype]++
		} else {
			biotype[geneAll[i].gene_biotype] = 1
		}
	}

	console.log('请求发送成功')
	res.json({ genes, histone, variation, biotype })
})

module.exports = GeneRouter
