const express = require('express')
const sqlConnect = require('../utils/mysql')
const GeneRouter = express.Router()

const sqlBuilder = {
	gene: (chromosome, start, end) => {
		return `SELECT * FROM uniq_new_gene_all_info WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
	},
	chm13All: (chromosome, start, end) => {
		return `SELECT * FROM chm13_gene WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
	},
	grch38All: (chromosome, start, end) => {
		return `SELECT * FROM grch38_gene WHERE chr_ID = '${chromosome}' AND start >= '${start}' AND end <= '${end}';`
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
	const chm13All = await sqlConnect(sqlBuilder.chm13All(chromosome, start, end))
	const grch38All = await sqlConnect(sqlBuilder.grch38All(chromosome, start, end))
	const biotype_chm13 = {}
	const biotype_grch38 = {}

	for (let i = 0; i < chm13All.length; i++) {
		if (biotype_chm13[chm13All[i].gene_biotype]) {
			biotype_chm13[chm13All[i].gene_biotype]++
		} else {
			biotype_chm13[chm13All[i].gene_biotype] = 1
		}
	}

	for (let i = 0; i < grch38All.length; i++) {
		if (biotype_grch38[grch38All[i].gene_biotype]) {
			biotype_grch38[grch38All[i].gene_biotype]++
		} else {
			biotype_grch38[grch38All[i].gene_biotype] = 1
		}
	}


	console.log('请求发送成功')
	res.json({ genes, histone, variation, biotype_chm13, biotype_grch38 })
})

module.exports = GeneRouter
