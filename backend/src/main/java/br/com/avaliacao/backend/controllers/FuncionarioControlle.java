package br.com.avaliacao.backend.controllers;

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

import br.com.avaliacao.backend.entities.Consultas;
import br.com.avaliacao.backend.entities.Exame;
import br.com.avaliacao.backend.entities.Funcionario;
import br.com.avaliacao.backend.repositories.ConsultaRepository;
import br.com.avaliacao.backend.repositories.ExameRepository;
import br.com.avaliacao.backend.repositories.FuncionarioRepository;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/funcionario")
public class FuncionarioControlle {
	
	@Autowired
	FuncionarioRepository repository;
	@Autowired
	ExameRepository exameRepository;
	@Autowired
	ConsultaRepository ConsultaRepo;
	
	@PostMapping("/criar")
	public String criarFuncionario(@RequestBody Funcionario funcionario) {
		
		repository.save(funcionario);
		return "Funcionario " + funcionario.getNome() + " cadastradro com sucesso :)";
	}
	
	@CrossOrigin
	@GetMapping("/obter/{nome}")
	public Boolean obterFuncionario(@PathVariable String nome) {
		Funcionario funcionarioContaining = repository.findByNomeIgnoreCase(nome);
		Boolean chekFuncionario = repository.equals(funcionarioContaining);
		return chekFuncionario;
	}
	
	@CrossOrigin
	@GetMapping("/obterFuncionarios")
	public Iterable<Funcionario> obterTodosFuncionario() {
		return repository.findAll();
	}
	
	@CrossOrigin
	@PutMapping("/atualizar/{codigo}")
	public String atualizarFuncionario(@RequestBody Funcionario funcionario) {
		Consultas consulta = ConsultaRepo.findByFuncionarioCodigo(funcionario.getCodigo());
		consulta.setFuncionario(funcionario);
		repository.save(funcionario);
		ConsultaRepo.save(consulta);
		return "Funcionario " + funcionario.getNome() + " Atualizar";
	}
	
	@CrossOrigin
	@DeleteMapping("/excluir/{codigo}")
	public String excluirFuncionario(@PathVariable Integer codigo) {
		repository.deleteById(codigo);
		return "Funcionario Excluido";
	}
	
}
