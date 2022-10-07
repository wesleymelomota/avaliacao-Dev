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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.avaliacao.backend.entities.Consultas;
import br.com.avaliacao.backend.entities.Exame;
import br.com.avaliacao.backend.entities.Funcionario;
import br.com.avaliacao.backend.repositories.ConsultaRepository;
import br.com.avaliacao.backend.repositories.ExameRepository;

import br.com.avaliacao.backend.repositories.FuncionarioRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/consulta")
public class ConsultaController {
	
	@Autowired
	ConsultaRepository repository;
	@Autowired
	ExameRepository exameRep;
	@Autowired
	FuncionarioRepository funcionarioRepo;
	
	@PostMapping("/criar")
	public String criarConsulta(@RequestBody Consultas consulta) {
		try {
			Exame exame = exameRep.findByCodigo(consulta.getExame().getCodigo());
			exameRep.save(exame);
			Funcionario funcionario = funcionarioRepo.findByCodigo(consulta.getFuncionario().getCodigo());
			funcionarioRepo.save(funcionario);
			Consultas consultas = new Consultas(funcionario, exame, consulta.getData());
			repository.save(consultas);
			return "Consulta agendada para a Data: " + consulta.getData();
			
		} catch (Exception e) {
			// TODO: handle exception
			return "Ocorreu um erro ao cadastrar";
		}
		
	}
	
	@GetMapping("/obter")
	public Iterable<Consultas> obterConsultas() {
		return repository.findAll();
	}
	
	@GetMapping("/obter/{codigo}")
	public @ResponseBody Consultas obterConsultasPorCOdigo(@PathVariable Integer codigo) {
		if(repository.existsById(codigo)) {
			return repository.findById(codigo).get();			
		}else {
			Consultas consulta = new Consultas();
			return consulta;
		}
	}
	
	@PutMapping("/atualizar")
	public String atualizarConsulta(@RequestBody Consultas consulta) {
		try {
			Exame exame = exameRep.findByCodigo(consulta.getExame().getCodigo());
			exameRep.save(exame);
			Funcionario funcionario = funcionarioRepo.findByCodigo(consulta.getFuncionario().getCodigo());
			funcionarioRepo.save(funcionario);
			repository.save(consulta);
			return "Exame " + consulta.getExame().getNomeExame() + ", " + "Funcionario " + 
			consulta.getFuncionario().getNome() + " Atualizado";
			
		} catch (Exception e) {
			// TODO: handle exception
			return "ERRO " + e;
		}
	}
	@CrossOrigin
	@DeleteMapping("/excluir/{codigoF}/{codigoE}/{codigo}")
	public String excluirConsulta(@PathVariable Integer codigoF, @PathVariable Integer codigoE,
			 @PathVariable Integer codigo) {
		try {
			repository.deleteById(codigo);
			funcionarioRepo.deleteById(codigoF);
			exameRep.deleteById(codigoE);
			return "Consulta Excluida ";
			
		} catch (Exception e) {
			// TODO: handle exception
			return " :( ";
		}
	}
}
