import { Request, Response } from "express";
import * as PlantaRepository from "@repositories/PlantaRepository";
import { Luminosidade } from "@prisma/client"

export const createPlanta = async (req: Request, res: Response) => {
  try {
    const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body;

    if (typeof nome !== "string" || !nome.trim() || 
        typeof especie !== "string" || !especie.trim() || 
        !Number.isInteger(preco) || preco <= 0 ||
        estoque === undefined || !Number.isInteger(estoque) || estoque < 0 ||
        !luminosidade || !Object.values(Luminosidade).includes(luminosidade) ||
        petFriendly === undefined || typeof petFriendly !== "boolean" || 
        regaACadaDias === undefined || !Number.isInteger(regaACadaDias) || regaACadaDias <= 0) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const planta = await PlantaRepository.createPlanta({
      nome: nome,
      especie: especie,
      preco: preco,
      estoque: estoque,
      luminosidade: luminosidade,
      petFriendly: petFriendly,
      regaACadaDias: regaACadaDias,
    });

    return res.status(201).json(planta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar planta." });
  }
};

export const readAllPlantas = async (req: Request, res: Response) => {
  try {
    const { nome, luminosidade, petFriendly, ordem } = req.query;
 
    if (luminosidade !== undefined && !Object.values(Luminosidade).includes(luminosidade as Luminosidade)) {
      return res.status(400).json({ message: "Filtro de luminosidade inválido." });
    }

    if (petFriendly !== undefined && petFriendly !== "true" && petFriendly !== "false") {
      return res.status(400).json({ message: "Filtro petFriendly inválido." });
    }

    const plantas = await PlantaRepository.findAllPlantas({
      where: {
        nome: nome ? { contains: String(nome), mode: "insensitive" } : undefined,
        luminosidade: luminosidade ? (luminosidade as Luminosidade) : undefined,
        petFriendly: petFriendly !== undefined ? petFriendly === "true" : undefined,
      },
      orderBy: (ordem === "preco" || ordem === "nome") ? { [ordem]: "asc" } : undefined,
    });

    return res.status(200).json(plantas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar plantas." });
  }
};

export const readPlantasEsgotadas = async (req: Request, res: Response) => {
  try {
    const plantas = await PlantaRepository.findAllPlantas({
      where: { estoque: 0 },
    });
    return res.status(200).json(plantas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar plantas esgotadas." });
  }
};

export const readPlantaById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const planta = await PlantaRepository.findPlantaById(id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    return res.status(200).json(planta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar planta." });
  }
};

export const updatePlanta = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome, especie, preco, estoque, luminosidade, petFriendly, regaACadaDias } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const planta = await PlantaRepository.findPlantaById(id);
    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    if (nome !== undefined && (typeof nome !== "string" || nome.trim() === "")) { 
        return res.status(400).json({ message: "Nome inválido." });
    }

    if (especie !== undefined && (typeof especie !== "string" || especie.trim() === "")) {
      return res.status(400).json({ message: "Espécie inválida." });
    }

    if (preco !== undefined && (!Number.isInteger(preco) || preco <= 0)) {
      return res.status(400).json({ message: "Preço inválido." });
    }

    if (estoque !== undefined && (!Number.isInteger(estoque) || estoque < 0)) {
      return res.status(400).json({ message: "Estoque inválido." });
    }

    if (luminosidade !== undefined && !Object.values(Luminosidade).includes(luminosidade)) {
      return res.status(400).json({ message: "Luminosidade inválida." });
    }

    if (petFriendly !== undefined && typeof petFriendly !== "boolean") {
      return res.status(400).json({ message: "petFriendly deve ser boolean." });
    }

    if (regaACadaDias !== undefined && (!Number.isInteger(regaACadaDias) || regaACadaDias < 0)) {
      return res.status(400).json({ message: "regaACadaDias inválida." });
    }

    const updatedPlanta = await PlantaRepository.updatePlanta(id, {
      nome: nome?.trim(),
      especie: especie?.trim(),
      preco,
      estoque,
      luminosidade,
      petFriendly,
      regaACadaDias,
    });

    return res.status(200).json(updatedPlanta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar planta." });
  }
};

export const deletePlanta = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const planta = await PlantaRepository.findPlantaById(id);

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    await PlantaRepository.deletePlanta(id);

    return res.status(200).json({ message: "Planta deletada com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar planta." });
  }
};

export const createVenda = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { quantidade } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const planta = await PlantaRepository.findPlantaById(id);

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return res.status(400).json({ message: "Quantidade inválida." });
    }

    if (quantidade > planta.estoque) {
      return res.status(400).json({ message: "Quantidade em estoque insuficiente. Estoque atual: " + planta.estoque });
    }

    const updatedPlanta = await PlantaRepository.updatePlanta(id, {
      estoque: planta.estoque - quantidade,
    });

    return res.status(200).json(updatedPlanta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar venda." });
    }
};

export const readValorTotalEstoque = async (req: Request, res: Response) => {
  try {
    const plantas = await PlantaRepository.findAllPlantas({
        select: { preco: true, estoque: true },
    });

    const valorTotal = plantas.reduce((total, planta) => total + (planta.preco * planta.estoque), 0);
    const quantidadeTotalVasos = plantas.reduce((total, planta) => total + planta.estoque, 0);

    return res.status(200).json({ valorTotal, quantidadeTotalVasos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao calcular valor total do estoque." });
  }
};
