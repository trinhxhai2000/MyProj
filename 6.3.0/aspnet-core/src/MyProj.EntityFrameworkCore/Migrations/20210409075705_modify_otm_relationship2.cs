using Microsoft.EntityFrameworkCore.Migrations;

namespace MyProj.Migrations
{
    public partial class modify_otm_relationship2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Huyen_Tinh_TinhEntityId",
                table: "Huyen");

            migrationBuilder.DropColumn(
                name: "TinhId",
                table: "Huyen");

            migrationBuilder.AddColumn<int>(
                name: "TinhEntityId",
                table: "Tinh",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "TinhEntityId",
                table: "Huyen",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Huyen_Tinh_TinhEntityId",
                table: "Huyen",
                column: "TinhEntityId",
                principalTable: "Tinh",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Huyen_Tinh_TinhEntityId",
                table: "Huyen");

            migrationBuilder.DropColumn(
                name: "TinhEntityId",
                table: "Tinh");

            migrationBuilder.AlterColumn<int>(
                name: "TinhEntityId",
                table: "Huyen",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "TinhId",
                table: "Huyen",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Huyen_Tinh_TinhEntityId",
                table: "Huyen",
                column: "TinhEntityId",
                principalTable: "Tinh",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
