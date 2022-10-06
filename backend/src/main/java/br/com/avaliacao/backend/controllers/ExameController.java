package br.com.avaliacao.backend.controllers;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.avaliacao.backend.entities.Exame;
import br.com.avaliacao.backend.entities.Funcionario;
import br.com.avaliacao.backend.repositories.ExameRepository;
import br.com.avaliacao.backend.repositories.FuncionarioRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/exame")
public class ExameController {
	
	@Autowired
	ExameRepository repository;
	
	@Autowired
	FuncionarioRepository funcionarioRepo;
	
	@CrossOrigin
	@PostMapping("/criar")
	public String CriarExame(@RequestBody Exame exame) {
		repository.save(exame);
		return "Exame " + exame.getNomeExame() + " cadastrado";
	}
	
	@CrossOrigin
	@GetMapping("/{codigo}")
	public Optional<Exame> obterExame(@PathVariable Integer codigo) {
		return repository.findById(codigo);
	}
	
	
	@CrossOrigin
	@GetMapping("/obter/exames")
	public Iterable<Exame> ObterTodosExames() {
		return repository.findAll();
	}
	
	@PutMapping("/atualizar") 
	public String atualizarExame(@RequestBody Exame exame) {
		try {
			repository.save(exame);
			return "Exame " + exame.getNomeExame() + " Atualizdo "; 
		}catch (Exception e) {
			// TODO: handle exceptio
			return "Ocorreu Um ERRO " + e;
		}
		
	}
	
	
	@DeleteMapping("/excluir/{codigo}")
	public String excluirExame(@PathVariable Integer codigo) {
		//repository.findByfuncionarioCodigo(codigo).getCodigo();
		repository.deleteById(codigo);
		return "Excluido com sucesso";
	}
	
	
	
}
